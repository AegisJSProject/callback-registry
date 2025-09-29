import {
	eventToProp, capture as captureAttr, once as onceAttr, passive as passiveAttr, signal as signalAttr,
	registerEventAttribute, hasEventAttribute, registerSignal, abortController,
} from './events.js';

let _isRegistrationOpen = true;

const $$ = (selector, base = document) => base.querySelectorAll(selector);

const $ = (selector, base = document) => base.querySelector(selector);

export const requestFullscreen = { attr: 'data-request-fullscreen-selector', data: 'requestFullscreenSelector' };
export const toggleFullsceen = { attr: 'data-toggle-fullscreen-selector', data: 'toggleFullscreenSelector' };

export const FUNCS = {
	debug: {
		log: 'aegis:debug:log',
		info: 'aegis:debug:info',
		warn: 'aegis:debug:warn',
		error: 'aegis:debug:error',
	},
	navigate: {
		back: 'aegis:navigate:back',
		forward: 'aegis:navigate:forward',
		reload: 'aegis:navigate:reload',
		close: 'aegis:navigate:close',
		link: 'aegis:navigate:go',
		popup: 'aegis:navigate:popup',
	},
	ui: {
		command: 'aegis:ui:command',
		print: 'aegis:ui:print',
		remove: 'aegis:ui:remove',
		hide: 'aegis:ui:hide',
		unhide: 'aegis:ui:unhide',
		showModal: 'aegis:ui:showModal',
		closeModal: 'aegis:ui:closeModal',
		showPopover: 'aegis:ui:showPopover',
		hidePopover: 'aegis:ui:hidePopover',
		togglePopover: 'aegis:ui:togglePopover',
		enable: 'aegis:ui:enable',
		disable: 'aegis:ui:disable',
		scrollTo: 'aegis:ui:scrollTo',
		prevent: 'aegis:ui:prevent',
		revokeObjectURL: 'aegis:ui:revokeObjectURL',
		cancelAnimationFrame: 'aegis:ui:cancelAnimationFrame',
		requestFullscreen: 'aegis:ui:requestFullscreen',
		toggleFullscreen: 'aegis:ui:toggleFullsceen',
		exitFullsceen: 'aegis:ui:exitFullscreen',
		open: 'aegis:ui:open',
		close: 'aegis:ui:close',
		abortController: 'aegis:ui:controller:abort',
	},
};

const registry = new Map([
	[FUNCS.debug.log, console.log],
	[FUNCS.debug.warn, console.warn],
	[FUNCS.debug.error, console.error],
	[FUNCS.debug.info, console.info],
	[FUNCS.navigate.back, () => history.back()],
	[FUNCS.navigate.forward, () => history.forward()],
	[FUNCS.navigate.reload, () => history.go(0)],
	[FUNCS.navigate.close, () => globalThis.close()],
	[FUNCS.navigate.link, event => {
		if (event.isTrusted) {
			event.preventDefault();
			location.href = event.currentTarget.dataset.url;
		}
	}],
	[FUNCS.navigate.popup, event => {
		if (event.isTrusted) {
			event.preventDefault();
			globalThis.open(event.currentTarget.dataset.url);
		}
	}],
	[FUNCS.ui.hide, ({ currentTarget }) => {
		$$(currentTarget.dataset.hideSelector).forEach(el => el.hidden = true);
	}],
	[FUNCS.ui.unhide, ({ currentTarget }) => {
		$$(currentTarget.dataset.unhideSelector).forEach(el => el.hidden = false);
	}],
	[FUNCS.ui.disable, ({ currentTarget }) => {
		$$(currentTarget.dataset.disableSelector).forEach(el => el.disabled = true);
	}],
	[FUNCS.ui.enable, ({ currentTarget }) => {
		$$(currentTarget.dataset.enableSelector).forEach(el => el.disabled = false);
	}],
	[FUNCS.ui.remove, ({ currentTarget }) => {
		$$(currentTarget.dataset.removeSelector).forEach(el => el.remove());
	}],
	[FUNCS.ui.scrollTo, ({ currentTarget }) => {
		const target = $(currentTarget.dataset.scrollToSelector);

		if (target instanceof Element) {
			target.scrollIntoView({
				behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
					? 'instant'
					: 'smooth',
			});
		}
	}],
	[FUNCS.ui.revokeObjectURL, ({ currentTarget }) => URL.revokeObjectURL(currentTarget.src)],
	[FUNCS.ui.cancelAnimationFrame, ({ currentTarget }) => cancelAnimationFrame(parseInt(currentTarget.dataset.animationFrame))],
	[FUNCS.ui.clearInterval, ({ currentTarget }) => clearInterval(parseInt(currentTarget.dataset.clearInterval))],
	[FUNCS.ui.clearTimeout, ({ currentTarget }) => clearTimeout(parseInt(currentTarget.dataset.timeout))],
	[FUNCS.ui.abortController, ({ currentTarget }) => abortController(currentTarget.dataset.aegisEventController, currentTarget.dataset.aegisControllerReason)],
	[FUNCS.ui.open, ({ currentTarget }) => document.querySelector(currentTarget.dataset.openSelector).open = true],
	[FUNCS.ui.close, ({ currentTarget }) => document.querySelector(currentTarget.dataset.closeSelector).open = false],
	[FUNCS.ui.showModal, ({ currentTarget }) => {
		const target = $(currentTarget.dataset.showModalSelector);

		if (target instanceof HTMLDialogElement) {
			target.showModal();
		}
	}],
	[FUNCS.ui.closeModal, ({ currentTarget }) => {
		const target = $(currentTarget.dataset.closeModalSelector);

		if (target instanceof HTMLDialogElement) {
			target.close();
		}
	}],
	[FUNCS.ui.showPopover, ({ currentTarget }) => {
		const target = $(currentTarget.dataset.showPopoverSelector);

		if (target instanceof HTMLElement) {
			target.showPopover();
		}
	}],
	[FUNCS.ui.hidePopover, ({ currentTarget }) => {
		const target = $(currentTarget.dataset.hidePopoverSelector);

		if (target instanceof HTMLElement) {
			target.hidePopover();
		}
	}],
	[FUNCS.ui.togglePopover, ({ currentTarget }) => {
		const target = $(currentTarget.dataset.togglePopoverSelector);

		if (target instanceof HTMLElement) {
			target.togglePopover();
		}
	}],
	[FUNCS.ui.print, () => globalThis.print()],
	[FUNCS.ui.prevent, event => event.preventDefault()],
	[FUNCS.ui.requestFullscreen, ({ currentTarget}) => {
		if (currentTarget.dataset.hasOwnProperty(requestFullscreen.data)) {
			document.getElementById(currentTarget.dataset[requestFullscreen.data]).requestFullscreen();
		} else {
			currentTarget.requestFullscreen();
		}
	}],
	[FUNCS.ui.toggleFullscreen, ({ currentTarget }) => {
		const target = currentTarget.dataset.hasOwnProperty(toggleFullsceen.data)
			? document.getElementById(currentTarget.dataset[toggleFullsceen.data])
			: currentTarget;

		if (target.isSameNode(document.fullscreenElement)) {
			document.exitFullscreen();
		} else {
			target.requestFullscreen();
		}
	}],
	[FUNCS.ui.exitFullsceen, () => document.exitFullscreen()],
]);

/**
 * Check if callback registry is open
 *
 * @returns {boolean} Whether or not callback registry is open
 */
export const isRegistrationOpen = () => _isRegistrationOpen;

/**
 * Close callback registry
 *
 * @returns {boolean} Whether or not the callback was succesfully removed
 */
export const closeRegistration = () => _isRegistrationOpen = false;

/**
 * Get an array of registered callbacks
 *
 * @returns {Array} A frozen array listing keys to all registered callbacks
 */
export const listCallbacks = () => Object.freeze(Array.from(registry.keys()));

/**
 * Check if a callback is registered
 *
 * @param {string} name The name/key to check for in callback registry
 * @returns {boolean} Whether or not a callback is registered
 */
export const hasCallback = name => registry.has(name);

/**
 * Get a callback from the registry by name/key
 *
 * @param {string} name The name/key of the callback to get
 * @returns {Function|undefined} The corresponding function registered under that name/key
 */
export const getCallback = name => registry.get(name);

/**
 *	 Remove a callback from the registry
 *
 * @param {string} name The name/key of the callback to get
 * @returns {boolean} Whether or not the callback was successfully unregisterd
 */
export const unregisterCallback = name => _isRegistrationOpen && registry.delete(name);

/**
 * Remove all callbacks from the registry
 *
 * @returns {void}
 */
export const clearRegistry = () => registry.clear();

/**
 * Create a registered callback with a randomly generated name
 *
 * @param {Function} callback Callback function to register
 * @returns {string} The automatically generated key/name of the registered callback
 */
export const createCallback = (callback) => registerCallback('aegis:callback:' + crypto.randomUUID(), callback);

/**
 * Call a callback fromt the registry by name/key
 *
 * @param {string} name The name/key of the registered function
 * @param  {...any} args Any arguments to pass along to the function
 * @returns {any} Whatever the return value of the function is
 * @throws {Error} Throws if callback is not found or any error resulting from calling the function
 */
export function callCallback(name, ...args) {
	if (registry.has(name)) {
		return registry.get(name).apply(this || globalThis, args);
	} else {
		throw new Error(`No ${name} function registered.`);
	}
}

/**
 * Register a named callback in registry
 *
 * @param {string} name The name/key to register the callback under
 * @param {Function} callback The callback value to register
 * @returns {string} The registered name/key
 */
export function registerCallback(name, callback) {
	if (typeof name !==  'string' || name.length === 0) {
		throw new TypeError('Callback name must be a string.');
	} if (! (callback instanceof Function)) {
		throw new TypeError('Callback must be a function.');
	} else if (! _isRegistrationOpen) {
		throw new TypeError('Cannot register new callbacks because registry is closed.');
	} else if (registry.has(name)) {
		throw new Error(`Handler "${name}" is already registered.`);
	} else {
		registry.set(name, callback);
		return name;
	}
}

/**
 * Get the host/root node of a given thing.
 *
 * @param {Event|Document|Element|ShadowRoot} target Source thing to search for host of
 * @returns {Document|Element|null} The host/root node, or null
 */
export function getHost(target) {
	if (target instanceof Event) {
		return getHost(target.currentTarget);
	} else if (target instanceof Document) {
		return target;
	} else if (target instanceof Element) {
		return getHost(target.getRootNode());
	} else if (target instanceof ShadowRoot) {
		return target.host;
	} else {
		return null;
	}
}

export function on(event, callback, { capture = false, passive = false, once = false, signal } = {}) {
	if (callback instanceof Function) {
		return on(event, createCallback(callback), { capture, passive, once, signal });
	} else if (typeof callback !== 'string' || callback.length === 0) {
		throw new TypeError('Callback must be a function or a registered callback string.');
	} else if (typeof event !== 'string' || event.length === 0) {
		throw new TypeError('Event must be a non-empty string.');
	} else {
		if (! hasEventAttribute(event)) {
			registerEventAttribute(event);
		}

		const parts = [[eventToProp(event), callback]];

		if (capture) {
			parts.push([captureAttr, '']);
		}

		if (passive) {
			parts.push([passiveAttr, '']);
		}

		if (once) {
			parts.push([onceAttr, '']);
		}

		if (signal instanceof AbortSignal) {
			parts.push([signalAttr, registerSignal(signal)]);
		} else if (typeof signal === 'string') {
			parts.push([signalAttr, signal]);
		}

		return parts.map(([prop, val]) => `${prop}="${val}"`).join(' ');
	}
}

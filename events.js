import { hasCallback, getCallback } from './callbacks.js';

const PREFIX = 'data-aegis-event-';
const EVENT_PREFIX = PREFIX + 'on-';
const EVENT_PREFIX_LENGTH = EVENT_PREFIX.length;
const DATA_PREFIX = 'aegisEventOn';
const DATA_PREFIX_LENGTH = DATA_PREFIX.length;
const signalSymbol = Symbol('aegis:signal');
const controllerSymbol = Symbol('aegis:controller');
const signalRegistry = new Map();
const controllerRegistry = new Map();

export const once = PREFIX + 'once';
export const passive = PREFIX + 'passive';
export const capture = PREFIX + 'capture';
export const signal = PREFIX + 'signal';
export const controller = PREFIX + 'controller';
export const onAbort = EVENT_PREFIX + 'abort';
export const onBlur = EVENT_PREFIX + 'blur';
export const onFocus = EVENT_PREFIX + 'focus';
export const onCancel = EVENT_PREFIX + 'cancel';
export const onAuxclick = EVENT_PREFIX + 'auxclick';
export const onBeforeinput = EVENT_PREFIX + 'beforeinput';
export const onBeforetoggle = EVENT_PREFIX + 'beforetoggle';
export const onCanplay = EVENT_PREFIX + 'canplay';
export const onCanplaythrough = EVENT_PREFIX + 'canplaythrough';
export const onChange = EVENT_PREFIX + 'change';
export const onClick = EVENT_PREFIX + 'click';
export const onClose = EVENT_PREFIX + 'close';
export const onCommand = EVENT_PREFIX + 'command';
export const onContextmenu = EVENT_PREFIX + 'contextmenu';
export const onCopy = EVENT_PREFIX + 'copy';
export const onCuechange = EVENT_PREFIX + 'cuechange';
export const onCut = EVENT_PREFIX + 'cut';
export const onDblclick = EVENT_PREFIX + 'dblclick';
export const onDrag = EVENT_PREFIX + 'drag';
export const onDragend = EVENT_PREFIX + 'dragend';
export const onDragenter = EVENT_PREFIX + 'dragenter';
export const onDragexit = EVENT_PREFIX + 'dragexit';
export const onDragleave = EVENT_PREFIX + 'dragleave';
export const onDragover = EVENT_PREFIX + 'dragover';
export const onDragstart = EVENT_PREFIX + 'dragstart';
export const onDrop = EVENT_PREFIX + 'drop';
export const onDurationchange = EVENT_PREFIX + 'durationchange';
export const onEmptied = EVENT_PREFIX + 'emptied';
export const onEnded = EVENT_PREFIX + 'ended';
export const onFormdata = EVENT_PREFIX + 'formdata';
export const onInput = EVENT_PREFIX + 'input';
export const onInvalid = EVENT_PREFIX + 'invalid';
export const onKeydown = EVENT_PREFIX + 'keydown';
export const onKeypress = EVENT_PREFIX + 'keypress';
export const onKeyup = EVENT_PREFIX + 'keyup';
export const onLoad = EVENT_PREFIX + 'load';
export const onLoadeddata = EVENT_PREFIX + 'loadeddata';
export const onLoadedmetadata = EVENT_PREFIX + 'loadedmetadata';
export const onLoadstart = EVENT_PREFIX + 'loadstart';
export const onMousedown = EVENT_PREFIX + 'mousedown';
export const onMouseenter = EVENT_PREFIX + 'mouseenter';
export const onMouseleave = EVENT_PREFIX + 'mouseleave';
export const onMousemove = EVENT_PREFIX + 'mousemove';
export const onMouseout = EVENT_PREFIX + 'mouseout';
export const onMouseover = EVENT_PREFIX + 'mouseover';
export const onMouseup = EVENT_PREFIX + 'mouseup';
export const onWheel = EVENT_PREFIX + 'wheel';
export const onPaste = EVENT_PREFIX + 'paste';
export const onPause = EVENT_PREFIX + 'pause';
export const onPlay = EVENT_PREFIX + 'play';
export const onPlaying = EVENT_PREFIX + 'playing';
export const onProgress = EVENT_PREFIX + 'progress';
export const onRatechange = EVENT_PREFIX + 'ratechange';
export const onReset = EVENT_PREFIX + 'reset';
export const onResize = EVENT_PREFIX + 'resize';
export const onScroll = EVENT_PREFIX + 'scroll';
export const onScrollend = EVENT_PREFIX + 'scrollend';
export const onSecuritypolicyviolation = EVENT_PREFIX + 'securitypolicyviolation';
export const onSeeked = EVENT_PREFIX + 'seeked';
export const onSeeking = EVENT_PREFIX + 'seeking';
export const onSelect = EVENT_PREFIX + 'select';
export const onSlotchange = EVENT_PREFIX + 'slotchange';
export const onStalled = EVENT_PREFIX + 'stalled';
export const onSubmit = EVENT_PREFIX + 'submit';
export const onSuspend = EVENT_PREFIX + 'suspend';
export const onTimeupdate = EVENT_PREFIX + 'timeupdate';
export const onVolumechange = EVENT_PREFIX + 'volumechange';
export const onWaiting = EVENT_PREFIX + 'waiting';
export const onSelectstart = EVENT_PREFIX + 'selectstart';
export const onSelectionchange = EVENT_PREFIX + 'selectionchange';
export const onToggle = EVENT_PREFIX + 'toggle';
export const onPointercancel = EVENT_PREFIX + 'pointercancel';
export const onPointerdown = EVENT_PREFIX + 'pointerdown';
export const onPointerup = EVENT_PREFIX + 'pointerup';
export const onPointermove = EVENT_PREFIX + 'pointermove';
export const onPointerout = EVENT_PREFIX + 'pointerout';
export const onPointerover = EVENT_PREFIX + 'pointerover';
export const onPointerenter = EVENT_PREFIX + 'pointerenter';
export const onPointerleave = EVENT_PREFIX + 'pointerleave';
export const onGotpointercapture = EVENT_PREFIX + 'gotpointercapture';
export const onLostpointercapture = EVENT_PREFIX + 'lostpointercapture';
export const onMozfullscreenchange = EVENT_PREFIX + 'mozfullscreenchange';
export const onMozfullscreenerror = EVENT_PREFIX + 'mozfullscreenerror';
export const onAnimationcancel = EVENT_PREFIX + 'animationcancel';
export const onAnimationend = EVENT_PREFIX + 'animationend';
export const onAnimationiteration = EVENT_PREFIX + 'animationiteration';
export const onAnimationstart = EVENT_PREFIX + 'animationstart';
export const onTransitioncancel = EVENT_PREFIX + 'transitioncancel';
export const onTransitionend = EVENT_PREFIX + 'transitionend';
export const onTransitionrun = EVENT_PREFIX + 'transitionrun';
export const onTransitionstart = EVENT_PREFIX + 'transitionstart';
export const onWebkitanimationend = EVENT_PREFIX + 'webkitanimationend';
export const onWebkitanimationiteration = EVENT_PREFIX + 'webkitanimationiteration';
export const onWebkitanimationstart = EVENT_PREFIX + 'webkitanimationstart';
export const onWebkittransitionend = EVENT_PREFIX + 'webkittransitionend';
export const onError = EVENT_PREFIX + 'error';

export const eventAttrs = [
	onAbort,
	onBlur,
	onFocus,
	onCancel,
	onAuxclick,
	onBeforeinput,
	onBeforetoggle,
	onCanplay,
	onCanplaythrough,
	onChange,
	onClick,
	onClose,
	onCommand,
	onContextmenu,
	onCopy,
	onCuechange,
	onCut,
	onDblclick,
	onDrag,
	onDragend,
	onDragenter,
	onDragexit,
	onDragleave,
	onDragover,
	onDragstart,
	onDrop,
	onDurationchange,
	onEmptied,
	onEnded,
	onFormdata,
	onInput,
	onInvalid,
	onKeydown,
	onKeypress,
	onKeyup,
	onLoad,
	onLoadeddata,
	onLoadedmetadata,
	onLoadstart,
	onMousedown,
	onMouseenter,
	onMouseleave,
	onMousemove,
	onMouseout,
	onMouseover,
	onMouseup,
	onWheel,
	onPaste,
	onPause,
	onPlay,
	onPlaying,
	onProgress,
	onRatechange,
	onReset,
	onResize,
	onScroll,
	onScrollend,
	onSecuritypolicyviolation,
	onSeeked,
	onSeeking,
	onSelect,
	onSlotchange,
	onStalled,
	onSubmit,
	onSuspend,
	onTimeupdate,
	onVolumechange,
	onWaiting,
	onSelectstart,
	onSelectionchange,
	onToggle,
	onPointercancel,
	onPointerdown,
	onPointerup,
	onPointermove,
	onPointerout,
	onPointerover,
	onPointerenter,
	onPointerleave,
	onGotpointercapture,
	onLostpointercapture,
	onMozfullscreenchange,
	onMozfullscreenerror,
	onAnimationcancel,
	onAnimationend,
	onAnimationiteration,
	onAnimationstart,
	onTransitioncancel,
	onTransitionend,
	onTransitionrun,
	onTransitionstart,
	onWebkitanimationend,
	onWebkitanimationiteration,
	onWebkitanimationstart,
	onWebkittransitionend,
	onError,
];

let selector = eventAttrs.map(attr => `[${CSS.escape(attr)}]`).join(', ');

const attrToProp = attr => `on${attr[EVENT_PREFIX_LENGTH].toUpperCase()}${attr.substring(EVENT_PREFIX_LENGTH + 1)}`;

export const eventToProp = event => EVENT_PREFIX + event;

export const hasEventAttribute = event => eventAttrs.includes(EVENT_PREFIX + event);

const isEventDataAttr = ([name]) => name.startsWith(DATA_PREFIX);

function _addListeners(el, { signal, attrFilter = EVENTS } = {}) {
	const dataset = el.dataset;

	for (const [attr, val] of Object.entries(dataset).filter(isEventDataAttr)) {
		try {
			const event = 'on' + attr.substring(DATA_PREFIX_LENGTH);

			if (attrFilter.hasOwnProperty(event) && hasCallback(val)) {
				el.addEventListener(event.substring(2).toLowerCase(), getCallback(val), {
					passive: dataset.hasOwnProperty('aegisEventPassive'),
					capture: dataset.hasOwnProperty('aegisEventCapture'),
					once: dataset.hasOwnProperty('aegisEventOnce'),
					signal: dataset.hasOwnProperty('aegisEventSignal') ? getSignal(dataset.aegisEventSignal) : signal,
				});
			}
		} catch(err) {
			reportError(err);
		}
	}
}

const observer = new MutationObserver(records => {
	records.forEach(record  => {
		switch(record.type) {
			case 'childList':
				[...record.addedNodes]
					.filter(node => node.nodeType === Node.ELEMENT_NODE)
					.forEach(node => attachListeners(node));
				break;

			case 'attributes':
				if (typeof record.oldValue === 'string' && hasCallback(record.oldValue)) {
					record.target.removeEventListener(
						record.attributeName.substring(EVENT_PREFIX_LENGTH),
						getCallback(record.oldValue), {
							once: record.target.hasAttribute(once),
							capture: record.target.hasAttribute(capture),
							passive: record.target.hasAttribute(passive),
						}
					);
				}

				if (
					record.target.hasAttribute(record.attributeName)
					&& hasCallback(record.target.getAttribute(record.attributeName))
				) {
					record.target.addEventListener(
						record.attributeName.substring(EVENT_PREFIX_LENGTH),
						getCallback(record.target.getAttribute(record.attributeName)), {
							once: record.target.hasAttribute(once),
							capture: record.target.hasAttribute(capture),
							passive: record.target.hasAttribute(passive),
							signal: record.target.hasAttribute(signal) ? getSignal(record.target.getAttribute(signal)) : undefined,
						}
					);
				}
				break;
		}
	});
});

export const EVENTS = {
	onAbort,
	onBlur,
	onFocus,
	onCancel,
	onAuxclick,
	onBeforeinput,
	onBeforetoggle,
	onCanplay,
	onCanplaythrough,
	onChange,
	onClick,
	onClose,
	onCommand,
	onContextmenu,
	onCopy,
	onCuechange,
	onCut,
	onDblclick,
	onDrag,
	onDragend,
	onDragenter,
	onDragexit,
	onDragleave,
	onDragover,
	onDragstart,
	onDrop,
	onDurationchange,
	onEmptied,
	onEnded,
	onFormdata,
	onInput,
	onInvalid,
	onKeydown,
	onKeypress,
	onKeyup,
	onLoad,
	onLoadeddata,
	onLoadedmetadata,
	onLoadstart,
	onMousedown,
	onMouseenter,
	onMouseleave,
	onMousemove,
	onMouseout,
	onMouseover,
	onMouseup,
	onWheel,
	onPaste,
	onPause,
	onPlay,
	onPlaying,
	onProgress,
	onRatechange,
	onReset,
	onResize,
	onScroll,
	onScrollend,
	onSecuritypolicyviolation,
	onSeeked,
	onSeeking,
	onSelect,
	onSlotchange,
	onStalled,
	onSubmit,
	onSuspend,
	onTimeupdate,
	onVolumechange,
	onWaiting,
	onSelectstart,
	onSelectionchange,
	onToggle,
	onPointercancel,
	onPointerdown,
	onPointerup,
	onPointermove,
	onPointerout,
	onPointerover,
	onPointerenter,
	onPointerleave,
	onGotpointercapture,
	onLostpointercapture,
	onMozfullscreenchange,
	onMozfullscreenerror,
	onAnimationcancel,
	onAnimationend,
	onAnimationiteration,
	onAnimationstart,
	onTransitioncancel,
	onTransitionend,
	onTransitionrun,
	onTransitionstart,
	onWebkitanimationend,
	onWebkitanimationiteration,
	onWebkitanimationstart,
	onWebkittransitionend,
	onError,
	once,
	passive,
	capture,
};

/**
 * Register an attribute to observe for adding/removing event listeners
 *
 * @param {string} attr Name of the attribute to observe
 * @param {object} options
 * @param {boolean} [options.addListeners=false] Whether or not to automatically add listeners
 * @param {Document|Element} [options.base=document.body] Root node to observe
 * @param {AbortSignal} [options.signal] An abort signal to remove any listeners when aborted
 * @returns {string} The resulting `data-*` attribute name
 */
export function registerEventAttribute(attr, {
	addListeners = false,
	base = document.body,
	signal,
} = {}) {
	const fullAttr = EVENT_PREFIX + attr.toLowerCase();

	if (! eventAttrs.includes(fullAttr)) {
		const sel = `[${CSS.escape(fullAttr)}]`;
		const prop = attrToProp(fullAttr);
		eventAttrs.push(fullAttr);
		EVENTS[prop] = fullAttr;
		selector += `, ${sel}`;

		if (addListeners) {
			requestAnimationFrame(() => {
				const config = { attrFilter: { [prop]: sel }, signal };
				[base, ...base.querySelectorAll(sel)].forEach(el => _addListeners(el, config));
			});
		}
	}

	return fullAttr;
}

/**
 * Registers an `AbortController` in the controller registry and returns the key for it
 *
 * @param {AbortController} controller
 * @returns {string} The randomly generated key with which the controller is registered
 * @throws {TypeError} If controller is not an `AbortController`
 * @throws {Error} Any `reason` if controller is already aborted
 */
export function registerController(controller) {
	if (! (controller instanceof AbortController)) {
		throw new TypeError('Controller is not an `AbortSignal.');
	} else if (controller.signal.aborted) {
		throw controller.signal.reason;
	} else if (typeof controller.signal[controllerSymbol] === 'string') {
		return controller.signal[controllerSymbol];
	} else {
		const key = 'aegis:event:controller:' + crypto.randomUUID();
		Object.defineProperty(controller.signal, controllerSymbol, { value: key, writable: false, enumerable: false });
		controllerRegistry.set(key, controller);

		controller.signal.addEventListener('abort', unregisterController, { once: true });

		return key;
	}
}

/**
 * Removes a controller from the registry
 *
 * @param {AbortController|AbortSignal|string} key The registed key or the controller or signal it corresponds to
 * @returns {boolean} Whether or not the controller was successfully unregistered
 */
export function unregisterController(key) {
	if (key instanceof AbortController) {
		return controllerRegistry.delete(key.signal[controllerSymbol]);
	} else if (key instanceof AbortSignal) {
		return controllerRegistry.delete(key[controllerSymbol]);
	} else {
		return controllerRegistry.delete(key);
	}
}

/**
 * Creates and registers an `AbortController` in the controller registry and returns the key for it
 *
 * @param {object} options
 * @param {AbortSignal} [options.signal] An optional `AbortSignal` to externally abort the controller with
 * @returns {string} The randomly generated key with which the controller is registered
 */
export function createController({ signal } = {}) {
	const controller = new AbortController();

	if (signal instanceof AbortSignal) {
		signal.addEventListener('abort', ({ target }) => controller.abort(target.reason), { signal: controller.signal});
	}

	return registerController(controller);
}

/**
 * Get a registetd controller from the registry
 *
 * @param {string} key Generated key with which the controller was registered
 * @returns {AbortController|void} Any registered controller, if any
 */
export const getController = key => controllerRegistry.get(key);

export function abortController(key, reason) {
	const controller = getController(key);

	if (! (controller instanceof AbortController)) {
		return false;
	} else if (typeof reason === 'string') {
		controller.abort(new Error(reason));
		return true;
	} else {
		controller.abort(reason);
		return true;
	}
}

/**
 * Register an `AbortSignal` to be used in declarative HTML as a value for `data-aegis-event-signal`
 *
 * @param {AbortSignal} signal The signal to register
 * @returns {string} The registered key
 * @throws {TypeError} Thrown if not an `AbortSignal`
 */
export function registerSignal(signal) {
	if (! (signal instanceof AbortSignal)) {
		throw new TypeError('Signal must be an `AbortSignal`.');
	} else if (typeof signal[signalSymbol] === 'string') {
		return signal[signalSymbol];
	} else {
		const key = 'aegis:event:signal:' + crypto.randomUUID();
		Object.defineProperty(signal, signalSymbol, { value: key, writable: false, enumerable: false });
		signalRegistry.set(key, signal);
		signal.addEventListener('abort', ({ target }) => unregisterSignal(target[signalSymbol]), { once: true });

		return key;
	}
}

/**
 * Gets and `AbortSignal` from the registry
 *
 * @param {string} key The registered key for the signal
 * @returns {AbortSignal|void} The corresponding `AbortSignal`, if any
 */
export const getSignal = key => signalRegistry.get(key);

/**
 * Removes an `AbortSignal` from the registry
 *
 * @param {AbortSignal|string} signal An `AbortSignal` or the registered key for one
 * @returns {boolean} Whether or not the signal was sucessfully unregistered
 * @throws {TypeError} Throws if `signal` is not an `AbortSignal` or the key for a registered signal
 */
export function unregisterSignal(signal) {
	if (signal instanceof AbortSignal) {
		return signalRegistry.delete(signal[signalSymbol]);
	} else if (typeof signal === 'string') {
		return signalRegistry.delete(signal);
	} else {
		throw new TypeError('Signal must be an `AbortSignal` or registered key/attribute.');
	}
}

/**
 * Add listeners to an element and its children, matching a generated query based on registered attributes
 *
 * @param {Element|Document} target Root node to add listeners from
 * @param {object} options
 * @param {AbortSignal} [options.signal] Optional signal to remove event listeners
 * @returns {Element|Document} Returns the passed target node
 */
export function attachListeners(target, { signal } = {}) {
	const nodes = target instanceof Element && target.matches(selector)
		? [target, ...target.querySelectorAll(selector)]
		: target.querySelectorAll(selector);

	nodes.forEach(el => _addListeners(el, { signal }));

	return target;
}

/**
 * Add a node to the `MutationObserver` to observe attributes and add/remove event listeners
 *
 * @param {Document|Element} root Element to observe attributes on
 */
export function observeEvents(root = document) {
	attachListeners(root);

	observer.observe(root, {
		subtree: true,
		childList:true,
		attributes: true,
		attributeOldValue: true,
		attributeFilter: eventAttrs,
	});
}

/**
 * Disconnects the `MutationObserver`, disabling observing of all attribute changes
 *
 * @returns {void}
 */
export const disconnectEventsObserver = () => observer.disconnect();

/**
 * Register a global error handler callback
 *
 * @param {Function} callback Callback to register as a global error handler
 * @param {EventInit} config Typical event listener config object
 */
export function setGlobalErrorHandler(callback, { capture, once, passive, signal } = {}) {
	if (callback instanceof Function) {
		globalThis.addEventListener('error', callback, { capture, once, passive, signal });
	} else {
		throw new TypeError('Callback is not a function.');
	}
}

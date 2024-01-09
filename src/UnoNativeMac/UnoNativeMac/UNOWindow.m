//
//  UNOWindowDelegate.m
//

#import "UNOWindow.h"

void uno_window_invalidate(NSWindow *window)
{
    window.contentViewController.view.needsDisplay = true;
}

bool uno_window_resize(NSWindow *window, double width, double height)
{
    bool result = false;
    if (window) {
        NSRect frame = window.frame;
        frame.size = CGSizeMake(width, height);
        [window setFrame:frame display:true animate:true];
        result = true;
    }
#if DEBUG
    NSLog (@"uno_window_resize %@ %f %f", window, width, height);
#endif
    return result;
}

void uno_window_set_min_size(NSWindow *window, double width, double height)
{
    window.minSize = CGSizeMake(width, height);
#if DEBUG
    NSLog (@"uno_window_set_min_size %@ %f %f", window, width, height);
#endif
}

void uno_window_set_title(NSWindow *window, const char* title)
{
    window.title = [NSString stringWithUTF8String:title];
}

static window_key_callback_fn_ptr window_key_down;
static window_key_callback_fn_ptr window_key_up;

inline static window_key_callback_fn_ptr uno_get_window_key_down_callback(void)
{
    return window_key_down;
}

void uno_set_window_key_down_callback(window_key_callback_fn_ptr p)
{
    window_key_down = p;
}

inline static window_key_callback_fn_ptr uno_get_window_key_up_callback(void)
{
    return window_key_up;
}

void uno_set_window_key_up_callback(window_key_callback_fn_ptr p)
{
    window_key_up = p;
}

VirtualKey get_virtual_key(unsigned short keyCode)
{
    switch(keyCode) {
        case 29: return VirtualKeyNumber0;
        case 18: return VirtualKeyNumber1;
        case 19: return VirtualKeyNumber2;
        case 20: return VirtualKeyNumber3;
        case 21: return VirtualKeyNumber4;
        case 23: return VirtualKeyNumber5;
        case 22: return VirtualKeyNumber6;
        case 26: return VirtualKeyNumber7;
        case 28: return VirtualKeyNumber8;
        case 25: return VirtualKeyNumber9;

        case 0: return VirtualKeyA;
        case 11: return VirtualKeyB;
        case 8: return VirtualKeyC;
        case 2: return VirtualKeyD;
        case 14: return VirtualKeyE;
        case 3: return VirtualKeyF;
        case 5: return VirtualKeyG;
        case 4: return VirtualKeyH;
        case 34: return VirtualKeyI;
        case 38: return VirtualKeyJ;
        case 40: return VirtualKeyK;
        case 37: return VirtualKeyL;
        case 46: return VirtualKeyM;
        case 45: return VirtualKeyN;
        case 31: return VirtualKeyO;
        case 35: return VirtualKeyP;
        case 12: return VirtualKeyQ;
        case 15: return VirtualKeyR;
        case 1: return VirtualKeyS;
        case 17: return VirtualKeyT;
        case 32: return VirtualKeyU;
        case 9: return VirtualKeyV;
        case 13: return VirtualKeyW;
        case 7: return VirtualKeyX;
        case 16: return VirtualKeyY;
        case 6: return VirtualKeyZ;

        // Those keys are not mapped in the VirtualKey enum by windows, however the event is still raised
        // WARNING: Those keys are only "LOCATION on keyboard" codes.
        //            This means that for instance the 187 is a '=' on a querty keyboard, while it's a '+' on an azerty.
        case 10: return (VirtualKey)191; // § (Value observed on UWP 19041, fr-FR AZERTY US-int keyboard)
        case 50: return (VirtualKey)192; // ` (Value observed on UWP 19041, fr-FR qwerty US-int keyboard)
        case 27: return (VirtualKey)189; // - (Value observed on UWP 19041, fr-FR qwerty US-int keyboard)
        case 24: return (VirtualKey)187; // = (Value observed on UWP 19041, fr-FR qwerty US-int keyboard)
        case 33: return (VirtualKey)219; // [ (Value observed on UWP 19041, fr-FR qwerty US-int keyboard)
        case 30: return (VirtualKey)221; // ] (Value observed on UWP 19041, fr-FR qwerty US-int keyboard)
        case 41: return (VirtualKey)186; // ; (Value observed on UWP 19041, fr-FR qwerty US-int keyboard)
        case 39: return (VirtualKey)222; // ' (Value observed on UWP 19041, fr-FR qwerty US-int keyboard)
        case 43: return (VirtualKey)188; // , (Value observed on UWP 19041, fr-FR qwerty US-int keyboard)
        case 47: return (VirtualKey)190; // . (Value observed on UWP 19041, fr-FR qwerty US-int keyboard)
        case 44: return (VirtualKey)191; // / (Value observed on UWP 19041, fr-FR qwerty US-int keyboard)
        case 42: return (VirtualKey)220; // \ (Value observed on UWP 19041, fr-FR qwerty US-int keyboard)

        // [Key|Number] Pad
        case 82: return VirtualKeyNumberPad0;
        case 83: return VirtualKeyNumberPad1;
        case 84: return VirtualKeyNumberPad2;
        case 85: return VirtualKeyNumberPad3;
        case 86: return VirtualKeyNumberPad4;
        case 87: return VirtualKeyNumberPad5;
        case 88: return VirtualKeyNumberPad6;
        case 89: return VirtualKeyNumberPad7;
        case 91: return VirtualKeyNumberPad8;
        case 92: return VirtualKeyNumberPad9;
        case 65: return VirtualKeyDecimal;
        case 67: return VirtualKeyMultiply;
        case 69: return VirtualKeyAdd;
        case 75: return VirtualKeyDivide;
        case 78: return VirtualKeySubtract;
        case 81: return (VirtualKey)187;
        case 71: return VirtualKeyClear;
        case 76: return VirtualKeyEnter;

        case 49: return VirtualKeySpace;
        case 36: return VirtualKeyEnter;
        case 48: return VirtualKeyTab;
        case 51: return VirtualKeyBack;
        case 117: return VirtualKeyDelete;
        // 52   : return VirtualKey.␊

        case 53: return VirtualKeyEscape;
        case 55: return VirtualKeyLeftWindows;
        case 56: return VirtualKeyShift;
        case 57: return VirtualKeyCapitalLock;
        case 58: return VirtualKeyMenu;
        case 59: return VirtualKeyControl;
        case 60: return VirtualKeyRightShift;
        case 61: return VirtualKeyRightMenu;
        case 62: return VirtualKeyRightControl;

        // Functions
        // 63   : return VirtualKey.fn
        
        case 122: return VirtualKeyF1;
        case 120: return VirtualKeyF2;
        case 99: return VirtualKeyF3;
        case 118: return VirtualKeyF4;
        case 96: return VirtualKeyF5;
        case 97: return VirtualKeyF6;
        case 98: return VirtualKeyF7;
        case 100: return VirtualKeyF8;
        case 101: return VirtualKeyF9;
        case 109: return VirtualKeyF10;
        case 103: return VirtualKeyF11;
        case 111: return VirtualKeyF12;
        case 105: return VirtualKeyF13;
        case 107: return VirtualKeyF14;
        case 113: return VirtualKeyF15;
        case 106: return VirtualKeyF16;
        case 64: return VirtualKeyF17;
        case 79: return VirtualKeyF18;
        case 80: return VirtualKeyF19;
        case 90: return VirtualKeyF20;

        // Volume (Those keys does not fire any event on UWP)
        // 72   : return VirtualKey. // Volume down
        // 73   : return VirtualKey. // Volume up
        // 74   : return VirtualKey. // Mute

        // Navigation
        case 114: return VirtualKeyInsert;
        case 115: return VirtualKeyHome;
        case 119: return VirtualKeyEnd;
        case 116: return VirtualKeyPageUp;
        case 121: return VirtualKeyPageDown;
        case 123: return VirtualKeyLeft;
        case 124: return VirtualKeyRight;
        case 125: return VirtualKeyDown;
        case 126: return VirtualKeyUp;

        default: return VirtualKeyNone;
    }
}

// FIXME: based on uno/src/Uno.UWP/System/VirtualKeyHelper.macOS.cs where only Shift and Control are considered ?!?
// https://learn.microsoft.com/en-us/uwp/api/windows.system.virtualkeymodifiers?view=winrt-22621
VirtualKeyModifiers get_modifiers(NSEventModifierFlags mods)
{
    VirtualKeyModifiers vkm = VirtualKeyModifiersNone;
    if (mods & NSEventModifierFlagControl) {
        vkm |= VirtualKeyModifiersControl;
    }
    if (mods & NSEventModifierFlagShift) {
        vkm |= VirtualKeyModifiersShift;
    }
    if (mods & NSEventModifierFlagOption) {
        vkm |= VirtualKeyModifiersMenu; // documented as Alt
    }
    if (mods & NSEventModifierFlagCommand) {
        vkm |= VirtualKeyModifiersWindows;
    }
    return vkm;
}

static window_mouse_callback_fn_ptr window_mouse_event;

inline static window_mouse_callback_fn_ptr uno_get_window_mouse_event_callback(void)
{
    return window_mouse_event;
}

void uno_set_window_mouse_event_callback(window_mouse_callback_fn_ptr p)
{
    window_mouse_event = p;
}

static window_should_close_fn_ptr window_should_close;

inline window_should_close_fn_ptr uno_get_window_should_close_callback(void)
{
    return window_should_close;
}

void uno_set_window_should_close_callback(window_should_close_fn_ptr p)
{
    window_should_close = p;
}

@implementation UNOWindow : NSWindow

- (BOOL) getPositionFrom:(NSEvent*)event x:(CGFloat*)px y:(CGFloat *)py
{
    *py = self.contentView.frame.size.height - event.locationInWindow.y;
    // if we are in the titlebar, let send the event to `super` ... so close button will continue to work
    if (*py < 0) {
        return NO;
    }
    *px = event.locationInWindow.x;
    return YES;
}

- (void)sendEvent:(NSEvent *)event {
    bool handled = false;
    MouseEvents mouse = MouseEventsNone;
    PointerDeviceType pdt = PointerDeviceTypeMouse;
    bool inContact = NO;

    switch ([event type]) {
        case NSEventTypeLeftMouseDown:
        case NSEventTypeOtherMouseDown:
        case NSEventTypeRightMouseDown: {
            mouse = MouseEventsDown;
            inContact = YES;
            break;
        }
        case NSEventTypeLeftMouseUp:
        case NSEventTypeOtherMouseUp:
        case NSEventTypeRightMouseUp: {
            mouse = MouseEventsUp;
            break;
        }
        case NSEventTypeLeftMouseDragged:
        case NSEventTypeRightMouseDragged:
        case NSEventTypeOtherMouseDragged: /* usually middle mouse dragged */
            inContact = YES;
        case NSEventTypeMouseMoved: {
            mouse = MouseEventsMoved;
            break;
        }
        case NSEventTypeTabletPoint: 
        case NSEventTypeTabletProximity: {
            mouse = MouseEventsMoved;
            pdt = PointerDeviceTypePen;
            break;
        }
        case NSEventTypeDirectTouch: {
            mouse = MouseEventsMoved;
            pdt = PointerDeviceTypeTouch;
            break;
        }
        case NSEventTypeScrollWheel: {
            mouse = MouseEventsScrollWheel;
            break;
        }
        case NSEventTypeMouseEntered: {
            mouse = MouseEventsEntered;
            break;
        }
        case NSEventTypeMouseExited: {
            mouse = MouseEventsExited;
            break;
        }
        case NSEventTypeKeyDown: {
            unsigned short scanCode = event.keyCode;
            handled = uno_get_window_key_down_callback()(get_virtual_key(scanCode), get_modifiers(event.modifierFlags), scanCode);
#if DEBUG
            NSLog(@"NSEventTypeKeyDown: %@ handled? %s", event, handled ? "true" : "false");
#endif
            break;
        }
        case NSEventTypeKeyUp: {
            unsigned short scanCode = event.keyCode;
            handled = uno_get_window_key_up_callback()(get_virtual_key(scanCode), get_modifiers(event.modifierFlags), scanCode);
#if DEBUG
            NSLog(@"NSEventTypeKeyUp: %@ handled? %s", event, handled ? "true" : "false");
#endif
            break;
        }
#if DEBUG
        case NSEventTypeFlagsChanged: {
            NSLog(@"NSEventTypeFlagsChanged: %@", event); // FIXME: needed ?
            break;
        }
        default: {
            NSLog(@"Unhandled Event: %@", event);
            break;
        }
#endif
    }
    
    if (mouse != MouseEventsNone) {
        CGFloat px, py;
        if ([self getPositionFrom:event x:&px y:&py]) {
#if false
            // check subtype for most mouse events
            // FIXME: does not work, the mouse also issue the NSEventSubtypeTabletPoint subevent and this cause  assertions
            // *** Assertion failure in -[NSEvent pointingDeviceID], NSEvent.m:4683
            if ((pdt == PointerDeviceTypeMouse) && (mouse != MouseEventsEntered) && (mouse != MouseEventsExited)) {
                if ((event.subtype == NSEventSubtypeTabletPoint) || (event.subtype == NSEventSubtypeTabletProximity)) {
                    NSLog(@"PointerDeviceTypePen detected %d", event.subtype);
                    pdt = PointerDeviceTypePen;
                }
            }
#endif
            NSTimeInterval ts = event.timestamp;
            
            // The precision of the frameId is 10 frame per ms ... which should be enough
            uint32 frameId = (uint)(ts * 1000.0 * 10.0);
            uint64 bootTime = /* NSDate.now +*/ NSProcessInfo.processInfo.systemUptime * 10000000;
            uint64 timestamp = ts * 10000000 + bootTime; // FIXME
 
            uint32 pid = (pdt == PointerDeviceTypePen) ? (uint32) event.pointingDeviceID : 1;

            handled = uno_get_window_mouse_event_callback()(mouse, px, py, get_modifiers(event.modifierFlags), pdt, frameId, timestamp, pid);
#if DEBUG
            NSLog(@"NSEventTypeMouse*: %@ %g %g handled? %s", event, px, py, handled ? "true" : "false");
#endif
        }
    }

    if (!handled) {
        [super sendEvent:event];
    }
}

- (bool)windowShouldClose:(NSWindow *)sender
{
#if DEBUG
    NSLog(@"UNOWindowDelegate.windowShouldClose %@", sender);
#endif
    // see `ISystemNavigationManagerPreviewExtension`
    return uno_get_window_should_close_callback()() ? YES : NO;
}


@end

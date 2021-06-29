"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = exports.isObject = exports.toObject = exports.iterateInheritedPrototype = exports.getPrototypeOf = void 0;
function getPrototypeOf(obj) {
    return Object.getPrototypeOf ? Object.getPrototypeOf(obj) : obj.__proto__;
}
exports.getPrototypeOf = getPrototypeOf;
function iterateInheritedPrototype(callback, fromCtor, toCtor, includeToCtor = true) {
    let proto = fromCtor.prototype || fromCtor;
    const toProto = toCtor.prototype || toCtor;
    while (proto) {
        if (!includeToCtor && proto === toProto)
            break;
        if (callback(proto) === false)
            break;
        if (proto === toProto)
            break;
        proto = getPrototypeOf(proto);
    }
}
exports.iterateInheritedPrototype = iterateInheritedPrototype;
function toObject(something, options = {}) {
    const obj = {};
    if (!isObject(something))
        return obj;
    const excludes = options.excludes || ['constructor'];
    const { enumerable = true, configurable = 0, writable = 0 } = options;
    const defaultDesc = {};
    if (enumerable !== 0)
        defaultDesc.enumerable = enumerable;
    if (configurable !== 0)
        defaultDesc.configurable = configurable;
    if (writable !== 0)
        defaultDesc.writable = writable;
    iterateInheritedPrototype((proto) => {
        Object.getOwnPropertyNames(proto).forEach((key) => {
            if (excludes.indexOf(key) >= 0)
                return;
            if (obj.hasOwnProperty(key))
                return;
            const desc = Object.getOwnPropertyDescriptor(proto, key);
            const fnKeys = ['get', 'set', 'value'];
            fnKeys.forEach((k) => {
                if (typeof desc[k] === 'function') {
                    const oldFn = desc[k];
                    desc[k] = function (...args) {
                        return oldFn.apply(options.hasOwnProperty('bindTo') ? options.bindTo : this, args);
                    };
                }
            });
            Object.defineProperty(obj, key, Object.assign(Object.assign({}, desc), defaultDesc));
        });
    }, something, options.till || Object, false);
    return obj;
}
exports.toObject = toObject;
function isObject(something) {
    const type = typeof something;
    return something !== null && (type === 'function' || type === 'object');
}
exports.isObject = isObject;
function isPlainObject(something) {
    return Object.prototype.toString.call(something) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsU0FBZ0IsY0FBYyxDQUFDLEdBQVE7SUFDckMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBQzVFLENBQUM7QUFGRCx3Q0FFQztBQWlCRCxTQUFnQix5QkFBeUIsQ0FDdkMsUUFBMkMsRUFDM0MsUUFBYSxFQUNiLE1BQVcsRUFDWCxhQUFhLEdBQUcsSUFBSTtJQUVwQixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQztJQUMzQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQztJQUUzQyxPQUFPLEtBQUssRUFBRTtRQUNaLElBQUksQ0FBQyxhQUFhLElBQUksS0FBSyxLQUFLLE9BQU87WUFBRSxNQUFNO1FBQy9DLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUs7WUFBRSxNQUFNO1FBQ3JDLElBQUksS0FBSyxLQUFLLE9BQU87WUFBRSxNQUFNO1FBQzdCLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDL0I7QUFDSCxDQUFDO0FBZkQsOERBZUM7QUFxREQsU0FBZ0IsUUFBUSxDQUN0QixTQUFjLEVBQ2QsVUFBeUMsRUFBRTtJQUUzQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUFFLE9BQU8sR0FBRyxDQUFDO0lBRXJDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsVUFBVSxHQUFHLElBQUksRUFBRSxZQUFZLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDdEUsTUFBTSxXQUFXLEdBQXVCLEVBQUUsQ0FBQztJQUMzQyxJQUFJLFVBQVUsS0FBSyxDQUFDO1FBQUUsV0FBVyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDMUQsSUFBSSxZQUFZLEtBQUssQ0FBQztRQUFFLFdBQVcsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ2hFLElBQUksUUFBUSxLQUFLLENBQUM7UUFBRSxXQUFXLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUVwRCx5QkFBeUIsQ0FDdkIsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNSLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNoRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFBRSxPQUFPO1lBQ3ZDLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTztZQUNwQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQzFDLEtBQUssRUFDTCxHQUFHLENBQ2tCLENBQUM7WUFFeEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBaUIsQ0FBQztZQUN2RCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25CLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO29CQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFRLENBQUM7b0JBQzdCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsSUFBVzt3QkFDaEMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUNoQixPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQ3hELElBQUksQ0FDTCxDQUFDO29CQUNKLENBQUMsQ0FBQztpQkFDSDtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxrQ0FBTyxJQUFJLEdBQUssV0FBVyxFQUFHLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLEVBQ0QsU0FBUyxFQUNULE9BQU8sQ0FBQyxJQUFJLElBQUksTUFBTSxFQUN0QixLQUFLLENBQ04sQ0FBQztJQUVGLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQTdDRCw0QkE2Q0M7QUFPRCxTQUFnQixRQUFRLENBQUMsU0FBYztJQUNyQyxNQUFNLElBQUksR0FBRyxPQUFPLFNBQVMsQ0FBQztJQUM5QixPQUFPLFNBQVMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBSEQsNEJBR0M7QUFFRCxTQUFnQixhQUFhLENBQUMsU0FBYztJQUMxQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxpQkFBaUIsQ0FBQztBQUN6RSxDQUFDO0FBRkQsc0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiBBdXRob3IgTW9yYSA8cWl1emhvbmdsZWlhYmNAMTI2LmNvbT4gKGh0dHBzOi8vZ2l0aHViLmNvbS9xaXU4MzEwKVxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKG9iajogYW55KTogYW55IHtcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopIDogb2JqLl9fcHJvdG9fXztcbn1cblxuLyoqXG4gKiDpgY3ljobnu6fmib/lhbPns7vnsbvnmoQgcHJvdG90eXBlXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSDlm57osIPlh73mlbDvvIzlh73mlbDlj4LmlbDmmK/pgY3ljobnmoTmr4/kuKrlrp7kvovnmoQgcHJvdG90eXBl77yM5Ye95pWw5aaC5p6c6L+U5ZueIGZhbHNl77yM5Lya57uI5q2i6YGN5Y6GXG4gKiBAcGFyYW0ge2FueX0gZnJvbUN0b3IgIC0g6KaB6YGN5Y6G55qE6LW35aeLIGNsYXNzIOaIliBwcm90b3R5cGVcbiAqIEBwYXJhbSB7YW55fSB0b0N0b3IgICAgLSDopoHpgY3ljobnmoTnu5PmnZ8gY2xhc3Mg5oiWIHByb3RvdHlwZVxuICogQHBhcmFtIHtib29sZWFufSBbaW5jbHVkZVRvQ3Rvcj10cnVlXSAtIOaYr+WQpuimgeWMheWQq+e7k+adnyB0b0N0b3Ig5pys6LqrXG4gKlxuICogQGV4YW1wbGVcbiAqIEEgLT4gQiAtPiBDXG4gKlxuICog5ZyoIEMg5Lit6LCD55So77yaIGl0ZXJhdGVJbmhlcml0ZWRQcm90b3R5cGUoZm4sIEEsIEMsIHRydWUpXG4gKiDliJnvvIxmbiDkvJrooqvosIPnlKjkuInmrKHvvIzliIbliKvmmK8gZm4oQS5wcm90b3R5cGUpIGZuKEIucHJvdG90eXBlKSBmbihDLnByb3RvdHlwZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGl0ZXJhdGVJbmhlcml0ZWRQcm90b3R5cGUoXG4gIGNhbGxiYWNrOiAocHJvdG86IE9iamVjdCkgPT4gYm9vbGVhbiB8IHZvaWQsXG4gIGZyb21DdG9yOiBhbnksXG4gIHRvQ3RvcjogYW55LFxuICBpbmNsdWRlVG9DdG9yID0gdHJ1ZVxuKSB7XG4gIGxldCBwcm90byA9IGZyb21DdG9yLnByb3RvdHlwZSB8fCBmcm9tQ3RvcjtcbiAgY29uc3QgdG9Qcm90byA9IHRvQ3Rvci5wcm90b3R5cGUgfHwgdG9DdG9yO1xuXG4gIHdoaWxlIChwcm90bykge1xuICAgIGlmICghaW5jbHVkZVRvQ3RvciAmJiBwcm90byA9PT0gdG9Qcm90bykgYnJlYWs7XG4gICAgaWYgKGNhbGxiYWNrKHByb3RvKSA9PT0gZmFsc2UpIGJyZWFrO1xuICAgIGlmIChwcm90byA9PT0gdG9Qcm90bykgYnJlYWs7XG4gICAgcHJvdG8gPSBnZXRQcm90b3R5cGVPZihwcm90byk7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ2xhc3NJbnN0YW5jZVRvT2JqZWN0T3B0aW9ucyB7XG4gIC8qKlxuICAgKiDlsIbmiYDmnInnmoTlr7nosaHkuK3nmoTlh73mlbDnu5HlrprliLDmjIflrprnmoTlr7nosaHkuIpcbiAgICpcbiAgICogKirms6jmhI/vvJrlr7nosaHkuK3nmoTnrq3lpLTlh73mlbDml6Dms5Xph43mlrDnu5HlrpoqKlxuICAgKi9cbiAgYmluZFRvPzogYW55O1xuXG4gIC8qKlxuICAgKiDopoHmjpLpmaTnmoTplK7lkI1cbiAgICpcbiAgICog6buY6K6k77yaIFsnY29uc3RydWN0b3InXVxuICAgKi9cbiAgZXhjbHVkZXM/OiBzdHJpbmdbXTtcblxuICAvKipcbiAgICog6YCS5b2S6YGN5Y6G5Yiw55qE57uI54K55a+56LGh5oiWY2xhc3Mo5LiN5Lya6YGN5Y6G57uI54K55a+56LGh5LiK55qE5bGe5oCnKVxuICAgKlxuICAgKiDpu5jorqTvvJogT2JqZWN0XG4gICAqL1xuICB0aWxsPzogYW55O1xuXG4gIC8qKlxuICAgKiDnlJ/miJDnmoTmlrDlr7nosaHnmoTplK7lgLzmmK/lkKbpnIDopoEgZW51bWVyYWJsZe+8jCAwIOihqOekuuS9v+eUqOWOn+acrOeahOmFjee9ru+8jOatpOWAvOm7mOiupOS4uiB0cnVlXG4gICAqL1xuICBlbnVtZXJhYmxlPzogMCB8IGJvb2xlYW47XG4gIC8qKlxuICAgKiDnlJ/miJDnmoTmlrDlr7nosaHnmoTplK7lgLzmmK/lkKbpnIDopoEgY29uZmlndXJhYmxl77yMIOS4jeaMh+WumuaIluaMh+WumiAwIOWImeS9v+eUqOWOn+acrOeahFxuICAgKi9cbiAgY29uZmlndXJhYmxlPzogMCB8IGJvb2xlYW47XG4gIC8qKlxuICAgKiDnlJ/miJDnmoTmlrDlr7nosaHnmoTplK7lgLzmmK/lkKbpnIDopoEgd3JpdGFibGXvvIzkuI3mjIflrprmiJbmjIflrpogMCDliJnkvb/nlKjljp/mnKznmoRcbiAgICovXG4gIHdyaXRhYmxlPzogMCB8IGJvb2xlYW47XG59XG5cbi8qKlxuICpcbiAqIOWwhuS4gOS4quWPr+iDveWMheWQq+WOn+Wei+mTvueahOWvueixoeaJgeW5s+WMluaIkOWNleS4quWvueixoVxuICpcbiAqIOWmgu+8jOeOsOaciei/meagt+eahOexu+eahOe7p+aJv+WFs+ezuyBBIC0+IEIgLT4gQ++8jOW9k+WIm+W7uuS4gOS4quWunuS+iyBhID0gbmV3IEEoKSDml7ZcbiAqXG4gKiBhIOWunuS+i+S8muWtmOaciSBC44CBQyDnmoTljp/lnovpk77vvIzkvb/nlKjmraTlh73mlbAgbmV3YSA9IHRvT2JqZWN0KGEpIOS5i+WQju+8jFxuICogbmV3YSDlsLHkvJrlj5jmiJDkuIDkuKogUGxhaW5PYmplY3TvvIzkvYblroPmnIkgQeOAgULjgIFDIOS4iueahOaJgOacieWxnuaAp+WSjOaWueazle+8jFxuICog5b2T54S25LiN5YyF5ous6Z2Z5oCB5bGe5oCn5oiW5pa55rOVXG4gKlxuICog5rOo5oSPMe+8mueUqOatpOaWueazleeahOivne+8jOWwvemHj+mBv+WFjeWcqOexu+S4reS9v+eUqOiDluWHveaVsO+8jOiDluWHveaVsOeahCB0aGlzIOatu+atu+eahOe7keWumlxuICog5Zyo5Y6f5a+56LGh5Lit77yM5peg5rOV6YeN5paw57uR5a6aXG4gKlxuICog5rOo5oSPMu+8muexu+e7p+aJv+eahOaXtuWAmeS4jeimgeWcqOWHveaVsOS4reiwg+eUqCBzdXBlcu+8jHRvT2JqZWN0IOS5i+WQjuaYr+aJgeW5s+eahO+8jOayoeaciSBzdXBlciDkuYvor7RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvT2JqZWN0KFxuICBzb21ldGhpbmc6IGFueSxcbiAgb3B0aW9uczogSUNsYXNzSW5zdGFuY2VUb09iamVjdE9wdGlvbnMgPSB7fVxuKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuICBpZiAoIWlzT2JqZWN0KHNvbWV0aGluZykpIHJldHVybiBvYmo7XG5cbiAgY29uc3QgZXhjbHVkZXMgPSBvcHRpb25zLmV4Y2x1ZGVzIHx8IFsnY29uc3RydWN0b3InXTtcbiAgY29uc3QgeyBlbnVtZXJhYmxlID0gdHJ1ZSwgY29uZmlndXJhYmxlID0gMCwgd3JpdGFibGUgPSAwIH0gPSBvcHRpb25zO1xuICBjb25zdCBkZWZhdWx0RGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0ge307XG4gIGlmIChlbnVtZXJhYmxlICE9PSAwKSBkZWZhdWx0RGVzYy5lbnVtZXJhYmxlID0gZW51bWVyYWJsZTtcbiAgaWYgKGNvbmZpZ3VyYWJsZSAhPT0gMCkgZGVmYXVsdERlc2MuY29uZmlndXJhYmxlID0gY29uZmlndXJhYmxlO1xuICBpZiAod3JpdGFibGUgIT09IDApIGRlZmF1bHREZXNjLndyaXRhYmxlID0gd3JpdGFibGU7XG5cbiAgaXRlcmF0ZUluaGVyaXRlZFByb3RvdHlwZShcbiAgICAocHJvdG8pID0+IHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKGV4Y2x1ZGVzLmluZGV4T2Yoa2V5KSA+PSAwKSByZXR1cm47XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICAgICAgICBwcm90byxcbiAgICAgICAgICBrZXlcbiAgICAgICAgKSBhcyBQcm9wZXJ0eURlc2NyaXB0b3I7XG5cbiAgICAgICAgY29uc3QgZm5LZXlzID0gWydnZXQnLCAnc2V0JywgJ3ZhbHVlJ10gYXMgQXJyYXk8J2dldCc+O1xuICAgICAgICBmbktleXMuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgZGVzY1trXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc3Qgb2xkRm4gPSBkZXNjW2tdIGFzIGFueTtcbiAgICAgICAgICAgIGRlc2Nba10gPSBmdW5jdGlvbiAoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9sZEZuLmFwcGx5KFxuICAgICAgICAgICAgICAgIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2JpbmRUbycpID8gb3B0aW9ucy5iaW5kVG8gOiB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3NcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IC4uLmRlc2MsIC4uLmRlZmF1bHREZXNjIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBzb21ldGhpbmcsXG4gICAgb3B0aW9ucy50aWxsIHx8IE9iamVjdCxcbiAgICBmYWxzZVxuICApO1xuXG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICog5Yik5patIHNvbWV0aGluZyDmmK/kuI3mmK/kuIDkuKogSlMgT2JqZWN0ICjku44gbW9yYS1zY3JpcHQg5Lit5Y+W6L+H5p2l55qEKVxuICpcbiAqIOmZpOS6hiBudWxsLCDlj4rlrZfpnaLph4/vvIzlhbblroPkuIDoiKzpg73mmK8gT2JqZWN077yM5YyF5ousIOWHveaVsFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3Qoc29tZXRoaW5nOiBhbnkpIHtcbiAgY29uc3QgdHlwZSA9IHR5cGVvZiBzb21ldGhpbmc7XG4gIHJldHVybiBzb21ldGhpbmcgIT09IG51bGwgJiYgKHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdChzb21ldGhpbmc6IGFueSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNvbWV0aGluZykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuIl19
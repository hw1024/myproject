'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
    isArray: function isArray(value) {
        return Array.isArray(value);
    },
    isFunction: function isFunction(value) {
        return typeof value === 'function';
    },
    isDefined: function isDefined(value) {
        return typeof value !== 'undefined';
    },
    isObject: function isObject(value) {
        return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
    },
    each: function each(obj, iterator) {
        var i = void 0,
            key = void 0;
        if (obj && typeof obj.length === 'number') {
            for (i = 0; i < obj.length; i++) {
                iterator.call(obj[i], obj[i], i);
            }
        } else if (this.isObject(obj)) {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    iterator.call(obj[key], obj[key], key);
                }
            }
        }
        return obj;
    },
    encodeUriSegment: function encodeUriSegment(val) {
        return this.encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
    },
    encodeUriQuery: function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlV0aWxzLmpzIl0sIm5hbWVzIjpbImlzQXJyYXkiLCJ2YWx1ZSIsIkFycmF5IiwiaXNGdW5jdGlvbiIsImlzRGVmaW5lZCIsImlzT2JqZWN0IiwiZWFjaCIsIm9iaiIsIml0ZXJhdG9yIiwiaSIsImtleSIsImxlbmd0aCIsImNhbGwiLCJoYXNPd25Qcm9wZXJ0eSIsImVuY29kZVVyaVNlZ21lbnQiLCJ2YWwiLCJlbmNvZGVVcmlRdWVyeSIsInJlcGxhY2UiLCJwY3RFbmNvZGVTcGFjZXMiLCJlbmNvZGVVUklDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUFlO0FBQ1hBLFdBRFcsbUJBQ0hDLEtBREcsRUFDSTtBQUNYLGVBQU9DLE1BQU1GLE9BQU4sQ0FBY0MsS0FBZCxDQUFQO0FBQ0gsS0FIVTtBQUlYRSxjQUpXLHNCQUlBRixLQUpBLEVBSU87QUFDZCxlQUFPLE9BQU9BLEtBQVAsS0FBaUIsVUFBeEI7QUFDSCxLQU5VO0FBT1hHLGFBUFcscUJBT0RILEtBUEMsRUFPTTtBQUNiLGVBQU8sT0FBT0EsS0FBUCxLQUFpQixXQUF4QjtBQUNILEtBVFU7QUFVWEksWUFWVyxvQkFVRkosS0FWRSxFQVVLO0FBQ1osZUFBT0EsVUFBVSxJQUFWLElBQWtCLFFBQU9BLEtBQVAseUNBQU9BLEtBQVAsT0FBaUIsUUFBMUM7QUFDSCxLQVpVO0FBYVhLLFFBYlcsZ0JBYU5DLEdBYk0sRUFhREMsUUFiQyxFQWFTO0FBQ2hCLFlBQUlDLFVBQUo7QUFBQSxZQUFPQyxZQUFQO0FBQ0EsWUFBSUgsT0FBTyxPQUFPQSxJQUFJSSxNQUFYLEtBQXNCLFFBQWpDLEVBQTJDO0FBQ3ZDLGlCQUFLRixJQUFJLENBQVQsRUFBWUEsSUFBSUYsSUFBSUksTUFBcEIsRUFBNEJGLEdBQTVCLEVBQWlDO0FBQzdCRCx5QkFBU0ksSUFBVCxDQUFjTCxJQUFJRSxDQUFKLENBQWQsRUFBc0JGLElBQUlFLENBQUosQ0FBdEIsRUFBOEJBLENBQTlCO0FBQ0g7QUFDSixTQUpELE1BSU8sSUFBSSxLQUFLSixRQUFMLENBQWNFLEdBQWQsQ0FBSixFQUF3QjtBQUMzQixpQkFBS0csR0FBTCxJQUFZSCxHQUFaLEVBQWlCO0FBQ2Isb0JBQUlBLElBQUlNLGNBQUosQ0FBbUJILEdBQW5CLENBQUosRUFBNkI7QUFDekJGLDZCQUFTSSxJQUFULENBQWNMLElBQUlHLEdBQUosQ0FBZCxFQUF3QkgsSUFBSUcsR0FBSixDQUF4QixFQUFrQ0EsR0FBbEM7QUFDSDtBQUNKO0FBQ0o7QUFDRCxlQUFPSCxHQUFQO0FBQ0gsS0EzQlU7QUE0QlhPLG9CQTVCVyw0QkE0Qk1DLEdBNUJOLEVBNEJXO0FBQ2xCLGVBQU8sS0FBS0MsY0FBTCxDQUFvQkQsR0FBcEIsRUFBeUIsSUFBekIsRUFDUEUsT0FETyxDQUNDLE9BREQsRUFDVSxHQURWLEVBRVBBLE9BRk8sQ0FFQyxPQUZELEVBRVUsR0FGVixFQUdQQSxPQUhPLENBR0MsT0FIRCxFQUdVLEdBSFYsQ0FBUDtBQUlILEtBakNVO0FBa0NYRCxrQkFsQ1csMEJBa0NJRCxHQWxDSixFQWtDU0csZUFsQ1QsRUFrQzBCO0FBQ2pDLGVBQU9DLG1CQUFtQkosR0FBbkIsRUFDUEUsT0FETyxDQUNDLE9BREQsRUFDVSxHQURWLEVBRVBBLE9BRk8sQ0FFQyxPQUZELEVBRVUsR0FGVixFQUdQQSxPQUhPLENBR0MsTUFIRCxFQUdTLEdBSFQsRUFJUEEsT0FKTyxDQUlDLE9BSkQsRUFJVSxHQUpWLEVBS1BBLE9BTE8sQ0FLQyxNQUxELEVBS1VDLGtCQUFrQixLQUFsQixHQUEwQixHQUxwQyxDQUFQO0FBTUg7QUF6Q1UsQyIsImZpbGUiOiJVdGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGlzQXJyYXkodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSlcclxuICAgIH0sXHJcbiAgICBpc0Z1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgfSxcclxuICAgIGlzRGVmaW5lZCh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnXHJcbiAgICB9LFxyXG4gICAgaXNPYmplY3QodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0J1xyXG4gICAgfSxcclxuICAgIGVhY2gob2JqLCBpdGVyYXRvcikge1xyXG4gICAgICAgIGxldCBpLCBrZXlcclxuICAgICAgICBpZiAob2JqICYmIHR5cGVvZiBvYmoubGVuZ3RoID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKG9ialtpXSwgb2JqW2ldLCBpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzT2JqZWN0KG9iaikpIHtcclxuICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKG9ialtrZXldLCBvYmpba2V5XSwga2V5KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmpcclxuICAgIH0sXHJcbiAgICBlbmNvZGVVcmlTZWdtZW50KHZhbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuY29kZVVyaVF1ZXJ5KHZhbCwgdHJ1ZSkuXHJcbiAgICAgICAgcmVwbGFjZSgvJTI2L2dpLCAnJicpLlxyXG4gICAgICAgIHJlcGxhY2UoLyUzRC9naSwgJz0nKS5cclxuICAgICAgICByZXBsYWNlKC8lMkIvZ2ksICcrJylcclxuICAgIH0sXHJcbiAgICBlbmNvZGVVcmlRdWVyeSh2YWwsIHBjdEVuY29kZVNwYWNlcykge1xyXG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cclxuICAgICAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXHJcbiAgICAgICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxyXG4gICAgICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxyXG4gICAgICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cclxuICAgICAgICByZXBsYWNlKC8lMjAvZywgKHBjdEVuY29kZVNwYWNlcyA/ICclMjAnIDogJysnKSlcclxuICAgIH0sXHJcbn0iXX0=
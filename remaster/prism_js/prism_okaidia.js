/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+bash+c+cpp+css-extras+diff+docker+git+js-extras+json+json5+jsonp+nginx+python+jsx+tsx+rust+sass+scss+sql+typescript+vim+wasm+xml-doc&plugins=line-numbers+jsonp-highlight+highlight-keywords+command-line+normalize-whitespace+toolbar+copy-to-clipboard+download-button+match-braces+diff-highlight */
var _self =
        'undefined' != typeof window
            ? window
            : 'undefined' != typeof WorkerGlobalScope &&
              self instanceof WorkerGlobalScope
            ? self
            : {},
    Prism = (function (e) {
        var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
            t = 0,
            r = {},
            a = {
                manual: e.Prism && e.Prism.manual,
                disableWorkerMessageHandler:
                    e.Prism && e.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(n) {
                        return n instanceof i
                            ? new i(n.type, e(n.content), n.alias)
                            : Array.isArray(n)
                            ? n.map(e)
                            : n
                                  .replace(/&/g, '&amp;')
                                  .replace(/</g, '&lt;')
                                  .replace(/\u00a0/g, ' ')
                    },
                    type: function (e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function (e) {
                        return (
                            e.__id ||
                                Object.defineProperty(e, '__id', {
                                    value: ++t,
                                }),
                            e.__id
                        )
                    },
                    clone: function e(n, t) {
                        var r, i
                        switch (((t = t || {}), a.util.type(n))) {
                            case 'Object':
                                if (((i = a.util.objId(n)), t[i])) return t[i]
                                for (var l in ((r = {}), (t[i] = r), n))
                                    n.hasOwnProperty(l) && (r[l] = e(n[l], t))
                                return r
                            case 'Array':
                                return (
                                    (i = a.util.objId(n)),
                                    t[i]
                                        ? t[i]
                                        : ((r = []),
                                          (t[i] = r),
                                          n.forEach(function (n, a) {
                                              r[a] = e(n, t)
                                          }),
                                          r)
                                )
                            default:
                                return n
                        }
                    },
                    getLanguage: function (e) {
                        for (; e; ) {
                            var t = n.exec(e.className)
                            if (t) return t[1].toLowerCase()
                            e = e.parentElement
                        }
                        return 'none'
                    },
                    setLanguage: function (e, t) {
                        ;(e.className = e.className.replace(
                            RegExp(n, 'gi'),
                            '',
                        )),
                            e.classList.add('language-' + t)
                    },
                    currentScript: function () {
                        if ('undefined' == typeof document) return null
                        if ('currentScript' in document)
                            return document.currentScript
                        try {
                            throw new Error()
                        } catch (r) {
                            var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(
                                r.stack,
                            ) || [])[1]
                            if (e) {
                                var n = document.getElementsByTagName('script')
                                for (var t in n) if (n[t].src == e) return n[t]
                            }
                            return null
                        }
                    },
                    isActive: function (e, n, t) {
                        for (var r = 'no-' + n; e; ) {
                            var a = e.classList
                            if (a.contains(n)) return !0
                            if (a.contains(r)) return !1
                            e = e.parentElement
                        }
                        return !!t
                    },
                },
                languages: {
                    plain: r,
                    plaintext: r,
                    text: r,
                    txt: r,
                    extend: function (e, n) {
                        var t = a.util.clone(a.languages[e])
                        for (var r in n) t[r] = n[r]
                        return t
                    },
                    insertBefore: function (e, n, t, r) {
                        var i = (r = r || a.languages)[e],
                            l = {}
                        for (var o in i)
                            if (i.hasOwnProperty(o)) {
                                if (o == n)
                                    for (var s in t)
                                        t.hasOwnProperty(s) && (l[s] = t[s])
                                t.hasOwnProperty(o) || (l[o] = i[o])
                            }
                        var u = r[e]
                        return (
                            (r[e] = l),
                            a.languages.DFS(a.languages, function (n, t) {
                                t === u && n != e && (this[n] = l)
                            }),
                            l
                        )
                    },
                    DFS: function e(n, t, r, i) {
                        i = i || {}
                        var l = a.util.objId
                        for (var o in n)
                            if (n.hasOwnProperty(o)) {
                                t.call(n, o, n[o], r || o)
                                var s = n[o],
                                    u = a.util.type(s)
                                'Object' !== u || i[l(s)]
                                    ? 'Array' !== u ||
                                      i[l(s)] ||
                                      ((i[l(s)] = !0), e(s, t, o, i))
                                    : ((i[l(s)] = !0), e(s, t, null, i))
                            }
                    },
                },
                plugins: {},
                highlightAll: function (e, n) {
                    a.highlightAllUnder(document, e, n)
                },
                highlightAllUnder: function (e, n, t) {
                    var r = {
                        callback: t,
                        container: e,
                        selector:
                            'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
                    }
                    a.hooks.run('before-highlightall', r),
                        (r.elements = Array.prototype.slice.apply(
                            r.container.querySelectorAll(r.selector),
                        )),
                        a.hooks.run('before-all-elements-highlight', r)
                    for (var i, l = 0; (i = r.elements[l++]); )
                        a.highlightElement(i, !0 === n, r.callback)
                },
                highlightElement: function (n, t, r) {
                    var i = a.util.getLanguage(n),
                        l = a.languages[i]
                    a.util.setLanguage(n, i)
                    var o = n.parentElement
                    o &&
                        'pre' === o.nodeName.toLowerCase() &&
                        a.util.setLanguage(o, i)
                    var s = {
                        element: n,
                        language: i,
                        grammar: l,
                        code: n.textContent,
                    }
                    function u(e) {
                        ;(s.highlightedCode = e),
                            a.hooks.run('before-insert', s),
                            (s.element.innerHTML = s.highlightedCode),
                            a.hooks.run('after-highlight', s),
                            a.hooks.run('complete', s),
                            r && r.call(s.element)
                    }
                    if (
                        (a.hooks.run('before-sanity-check', s),
                        (o = s.element.parentElement) &&
                            'pre' === o.nodeName.toLowerCase() &&
                            !o.hasAttribute('tabindex') &&
                            o.setAttribute('tabindex', '0'),
                        !s.code)
                    )
                        return (
                            a.hooks.run('complete', s),
                            void (r && r.call(s.element))
                        )
                    if ((a.hooks.run('before-highlight', s), s.grammar))
                        if (t && e.Worker) {
                            var c = new Worker(a.filename)
                            ;(c.onmessage = function (e) {
                                u(e.data)
                            }),
                                c.postMessage(
                                    JSON.stringify({
                                        language: s.language,
                                        code: s.code,
                                        immediateClose: !0,
                                    }),
                                )
                        } else u(a.highlight(s.code, s.grammar, s.language))
                    else u(a.util.encode(s.code))
                },
                highlight: function (e, n, t) {
                    var r = { code: e, grammar: n, language: t }
                    if ((a.hooks.run('before-tokenize', r), !r.grammar))
                        throw new Error(
                            'The language "' + r.language + '" has no grammar.',
                        )
                    return (
                        (r.tokens = a.tokenize(r.code, r.grammar)),
                        a.hooks.run('after-tokenize', r),
                        i.stringify(a.util.encode(r.tokens), r.language)
                    )
                },
                tokenize: function (e, n) {
                    var t = n.rest
                    if (t) {
                        for (var r in t) n[r] = t[r]
                        delete n.rest
                    }
                    var a = new s()
                    return (
                        u(a, a.head, e),
                        o(e, a, n, a.head, 0),
                        (function (e) {
                            for (var n = [], t = e.head.next; t !== e.tail; )
                                n.push(t.value), (t = t.next)
                            return n
                        })(a)
                    )
                },
                hooks: {
                    all: {},
                    add: function (e, n) {
                        var t = a.hooks.all
                        ;(t[e] = t[e] || []), t[e].push(n)
                    },
                    run: function (e, n) {
                        var t = a.hooks.all[e]
                        if (t && t.length)
                            for (var r, i = 0; (r = t[i++]); ) r(n)
                    },
                },
                Token: i,
            }
        function i(e, n, t, r) {
            ;(this.type = e),
                (this.content = n),
                (this.alias = t),
                (this.length = 0 | (r || '').length)
        }
        function l(e, n, t, r) {
            e.lastIndex = n
            var a = e.exec(t)
            if (a && r && a[1]) {
                var i = a[1].length
                ;(a.index += i), (a[0] = a[0].slice(i))
            }
            return a
        }
        function o(e, n, t, r, s, g) {
            for (var f in t)
                if (t.hasOwnProperty(f) && t[f]) {
                    var h = t[f]
                    h = Array.isArray(h) ? h : [h]
                    for (var d = 0; d < h.length; ++d) {
                        if (g && g.cause == f + ',' + d) return
                        var v = h[d],
                            p = v.inside,
                            m = !!v.lookbehind,
                            y = !!v.greedy,
                            k = v.alias
                        if (y && !v.pattern.global) {
                            var x = v.pattern.toString().match(/[imsuy]*$/)[0]
                            v.pattern = RegExp(v.pattern.source, x + 'g')
                        }
                        for (
                            var b = v.pattern || v, w = r.next, A = s;
                            w !== n.tail && !(g && A >= g.reach);
                            A += w.value.length, w = w.next
                        ) {
                            var E = w.value
                            if (n.length > e.length) return
                            if (!(E instanceof i)) {
                                var P,
                                    L = 1
                                if (y) {
                                    if (
                                        !(P = l(b, A, e, m)) ||
                                        P.index >= e.length
                                    )
                                        break
                                    var S = P.index,
                                        O = P.index + P[0].length,
                                        j = A
                                    for (j += w.value.length; S >= j; )
                                        j += (w = w.next).value.length
                                    if (
                                        ((A = j -= w.value.length),
                                        w.value instanceof i)
                                    )
                                        continue
                                    for (
                                        var C = w;
                                        C !== n.tail &&
                                        (j < O || 'string' == typeof C.value);
                                        C = C.next
                                    )
                                        L++, (j += C.value.length)
                                    L--, (E = e.slice(A, j)), (P.index -= A)
                                } else if (!(P = l(b, 0, E, m))) continue
                                S = P.index
                                var N = P[0],
                                    _ = E.slice(0, S),
                                    M = E.slice(S + N.length),
                                    W = A + E.length
                                g && W > g.reach && (g.reach = W)
                                var z = w.prev
                                if (
                                    (_ && ((z = u(n, z, _)), (A += _.length)),
                                    c(n, z, L),
                                    (w = u(
                                        n,
                                        z,
                                        new i(
                                            f,
                                            p ? a.tokenize(N, p) : N,
                                            k,
                                            N,
                                        ),
                                    )),
                                    M && u(n, w, M),
                                    L > 1)
                                ) {
                                    var I = { cause: f + ',' + d, reach: W }
                                    o(e, n, t, w.prev, A, I),
                                        g &&
                                            I.reach > g.reach &&
                                            (g.reach = I.reach)
                                }
                            }
                        }
                    }
                }
        }
        function s() {
            var e = { value: null, prev: null, next: null },
                n = { value: null, prev: e, next: null }
            ;(e.next = n), (this.head = e), (this.tail = n), (this.length = 0)
        }
        function u(e, n, t) {
            var r = n.next,
                a = { value: t, prev: n, next: r }
            return (n.next = a), (r.prev = a), e.length++, a
        }
        function c(e, n, t) {
            for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next
            ;(n.next = r), (r.prev = n), (e.length -= a)
        }
        if (
            ((e.Prism = a),
            (i.stringify = function e(n, t) {
                if ('string' == typeof n) return n
                if (Array.isArray(n)) {
                    var r = ''
                    return (
                        n.forEach(function (n) {
                            r += e(n, t)
                        }),
                        r
                    )
                }
                var i = {
                        type: n.type,
                        content: e(n.content, t),
                        tag: 'span',
                        classes: ['token', n.type],
                        attributes: {},
                        language: t,
                    },
                    l = n.alias
                l &&
                    (Array.isArray(l)
                        ? Array.prototype.push.apply(i.classes, l)
                        : i.classes.push(l)),
                    a.hooks.run('wrap', i)
                var o = ''
                for (var s in i.attributes)
                    o +=
                        ' ' +
                        s +
                        '="' +
                        (i.attributes[s] || '').replace(/"/g, '&quot;') +
                        '"'
                return (
                    '<' +
                    i.tag +
                    ' class="' +
                    i.classes.join(' ') +
                    '"' +
                    o +
                    '>' +
                    i.content +
                    '</' +
                    i.tag +
                    '>'
                )
            }),
            !e.document)
        )
            return e.addEventListener
                ? (a.disableWorkerMessageHandler ||
                      e.addEventListener(
                          'message',
                          function (n) {
                              var t = JSON.parse(n.data),
                                  r = t.language,
                                  i = t.code,
                                  l = t.immediateClose
                              e.postMessage(a.highlight(i, a.languages[r], r)),
                                  l && e.close()
                          },
                          !1,
                      ),
                  a)
                : a
        var g = a.util.currentScript()
        function f() {
            a.manual || a.highlightAll()
        }
        if (
            (g &&
                ((a.filename = g.src),
                g.hasAttribute('data-manual') && (a.manual = !0)),
            !a.manual)
        ) {
            var h = document.readyState
            'loading' === h || ('interactive' === h && g && g.defer)
                ? document.addEventListener('DOMContentLoaded', f)
                : window.requestAnimationFrame
                ? window.requestAnimationFrame(f)
                : window.setTimeout(f, 16)
        }
        return a
    })(_self)
'undefined' != typeof module && module.exports && (module.exports = Prism),
    'undefined' != typeof global && (global.Prism = Prism)
;(Prism.languages.markup = {
    comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
    prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
    doctype: {
        pattern:
            /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
            'internal-subset': {
                pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null,
            },
            string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
            punctuation: /^<!|>$|[[\]]/,
            'doctype-tag': /^DOCTYPE/i,
            name: /[^\s<>'"]+/,
        },
    },
    cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
    tag: {
        pattern:
            /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
            },
            'special-attr': [],
            'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    punctuation: [
                        { pattern: /^=/, alias: 'attr-equals' },
                        { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
                    ],
                },
            },
            punctuation: /\/?>/,
            'attr-name': {
                pattern: /[^\s>\/]+/,
                inside: { namespace: /^[^\s>\/:]+:/ },
            },
        },
    },
    entity: [
        { pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' },
        /&#x?[\da-f]{1,8};/i,
    ],
}),
    (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
        Prism.languages.markup.entity),
    (Prism.languages.markup.doctype.inside['internal-subset'].inside =
        Prism.languages.markup),
    Prism.hooks.add('wrap', function (a) {
        'entity' === a.type &&
            (a.attributes.title = a.content.replace(/&amp;/, '&'))
    }),
    Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
        value: function (a, e) {
            var s = {}
            ;(s['language-' + e] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: Prism.languages[e],
            }),
                (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
            var t = {
                'included-cdata': {
                    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                    inside: s,
                },
            }
            t['language-' + e] = {
                pattern: /[\s\S]+/,
                inside: Prism.languages[e],
            }
            var n = {}
            ;(n[a] = {
                pattern: RegExp(
                    '(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(
                        /__/g,
                        function () {
                            return a
                        },
                    ),
                    'i',
                ),
                lookbehind: !0,
                greedy: !0,
                inside: t,
            }),
                Prism.languages.insertBefore('markup', 'cdata', n)
        },
    }),
    Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
        value: function (a, e) {
            Prism.languages.markup.tag.inside['special-attr'].push({
                pattern: RegExp(
                    '(^|["\'\\s])(?:' +
                        a +
                        ')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))',
                    'i',
                ),
                lookbehind: !0,
                inside: {
                    'attr-name': /^[^\s=]+/,
                    'attr-value': {
                        pattern: /=[\s\S]+/,
                        inside: {
                            value: {
                                pattern:
                                    /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                                lookbehind: !0,
                                alias: [e, 'language-' + e],
                                inside: Prism.languages[e],
                            },
                            punctuation: [
                                { pattern: /^=/, alias: 'attr-equals' },
                                /"|'/,
                            ],
                        },
                    },
                },
            })
        },
    }),
    (Prism.languages.html = Prism.languages.markup),
    (Prism.languages.mathml = Prism.languages.markup),
    (Prism.languages.svg = Prism.languages.markup),
    (Prism.languages.xml = Prism.languages.extend('markup', {})),
    (Prism.languages.ssml = Prism.languages.xml),
    (Prism.languages.atom = Prism.languages.xml),
    (Prism.languages.rss = Prism.languages.xml)
!(function (s) {
    var e =
        /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/
    ;(s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
            pattern: RegExp(
                '@[\\w-](?:[^;{\\s"\']|\\s+(?!\\s)|' +
                    e.source +
                    ')*?(?:;|(?=\\s*\\{))',
            ),
            inside: {
                rule: /^@[\w-]+/,
                'selector-function-argument': {
                    pattern:
                        /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                    lookbehind: !0,
                    alias: 'selector',
                },
                keyword: {
                    pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                    lookbehind: !0,
                },
            },
        },
        url: {
            pattern: RegExp(
                '\\burl\\((?:' +
                    e.source +
                    '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)',
                'i',
            ),
            greedy: !0,
            inside: {
                function: /^url/i,
                punctuation: /^\(|\)$/,
                string: { pattern: RegExp('^' + e.source + '$'), alias: 'url' },
            },
        },
        selector: {
            pattern: RegExp(
                '(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' +
                    e.source +
                    ')*(?=\\s*\\{)',
            ),
            lookbehind: !0,
        },
        string: { pattern: e, greedy: !0 },
        property: {
            pattern:
                /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: !0,
        },
        important: /!important\b/i,
        function: {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: !0,
        },
        punctuation: /[(){};:,]/,
    }),
        (s.languages.css.atrule.inside.rest = s.languages.css)
    var t = s.languages.markup
    t && (t.tag.addInlined('style', 'css'), t.tag.addAttribute('style', 'css'))
})(Prism)
Prism.languages.clike = {
    comment: [
        {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: !0,
            greedy: !0,
        },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
    },
    'class-name': {
        pattern:
            /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: { punctuation: /[.\\]/ },
    },
    keyword:
        /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/,
}
;(Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [
        Prism.languages.clike['class-name'],
        {
            pattern:
                /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: !0,
        },
    ],
    keyword: [
        { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
        {
            pattern:
                /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: !0,
        },
    ],
    function:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: {
        pattern: RegExp(
            '(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])',
        ),
        lookbehind: !0,
    },
    operator:
        /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
    (Prism.languages.javascript['class-name'][0].pattern =
        /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
    Prism.languages.insertBefore('javascript', 'keyword', {
        regex: {
            pattern: RegExp(
                '((?:^|[^$\\w\\xA0-\\uFFFF."\'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))',
            ),
            lookbehind: !0,
            greedy: !0,
            inside: {
                'regex-source': {
                    pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                    lookbehind: !0,
                    alias: 'language-regex',
                    inside: Prism.languages.regex,
                },
                'regex-delimiter': /^\/|\/$/,
                'regex-flags': /^[a-z]+$/,
            },
        },
        'function-variable': {
            pattern:
                /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: 'function',
        },
        parameter: [
            {
                pattern:
                    /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
            {
                pattern:
                    /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
                lookbehind: !0,
                inside: Prism.languages.javascript,
            },
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    }),
    Prism.languages.insertBefore('javascript', 'string', {
        hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' },
        'template-string': {
            pattern:
                /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
            greedy: !0,
            inside: {
                'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
                interpolation: {
                    pattern:
                        /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                    lookbehind: !0,
                    inside: {
                        'interpolation-punctuation': {
                            pattern: /^\$\{|\}$/,
                            alias: 'punctuation',
                        },
                        rest: Prism.languages.javascript,
                    },
                },
                string: /[\s\S]+/,
            },
        },
        'string-property': {
            pattern:
                /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
            lookbehind: !0,
            greedy: !0,
            alias: 'property',
        },
    }),
    Prism.languages.insertBefore('javascript', 'operator', {
        'literal-property': {
            pattern:
                /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
            lookbehind: !0,
            alias: 'property',
        },
    }),
    Prism.languages.markup &&
        (Prism.languages.markup.tag.addInlined('script', 'javascript'),
        Prism.languages.markup.tag.addAttribute(
            'on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)',
            'javascript',
        )),
    (Prism.languages.js = Prism.languages.javascript)
!(function (e) {
    var t =
            '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b',
        a = {
            pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
            lookbehind: !0,
            alias: 'punctuation',
            inside: null,
        },
        n = {
            bash: a,
            environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
            variable: [
                {
                    pattern: /\$?\(\([\s\S]+?\)\)/,
                    greedy: !0,
                    inside: {
                        variable: [
                            { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
                            /^\$\(\(/,
                        ],
                        number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
                        operator:
                            /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
                        punctuation: /\(\(?|\)\)?|,|;/,
                    },
                },
                {
                    pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
                    greedy: !0,
                    inside: { variable: /^\$\(|^`|\)$|`$/ },
                },
                {
                    pattern: /\$\{[^}]+\}/,
                    greedy: !0,
                    inside: {
                        operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
                        punctuation: /[\[\]]/,
                        environment: {
                            pattern: RegExp('(\\{)' + t),
                            lookbehind: !0,
                            alias: 'constant',
                        },
                    },
                },
                /\$(?:\w+|[#?*!@$])/,
            ],
            entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/,
        }
    ;(e.languages.bash = {
        shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
        comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
        'function-name': [
            {
                pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
                lookbehind: !0,
                alias: 'function',
            },
            { pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/, alias: 'function' },
        ],
        'for-or-select': {
            pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
            alias: 'variable',
            lookbehind: !0,
        },
        'assign-left': {
            pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,
            inside: {
                environment: {
                    pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t),
                    lookbehind: !0,
                    alias: 'constant',
                },
            },
            alias: 'variable',
            lookbehind: !0,
        },
        parameter: {
            pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,
            alias: 'variable',
            lookbehind: !0,
        },
        string: [
            {
                pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
                lookbehind: !0,
                greedy: !0,
                inside: n,
            },
            {
                pattern:
                    /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
                lookbehind: !0,
                greedy: !0,
                inside: { bash: a },
            },
            {
                pattern:
                    /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
                lookbehind: !0,
                greedy: !0,
                inside: n,
            },
            { pattern: /(^|[^$\\])'[^']*'/, lookbehind: !0, greedy: !0 },
            {
                pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
                greedy: !0,
                inside: { entity: n.entity },
            },
        ],
        environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
        variable: n.variable,
        function: {
            pattern:
                /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
            lookbehind: !0,
        },
        keyword: {
            pattern:
                /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
            lookbehind: !0,
        },
        builtin: {
            pattern:
                /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
            lookbehind: !0,
            alias: 'class-name',
        },
        boolean: {
            pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
            lookbehind: !0,
        },
        'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
        operator: {
            pattern:
                /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
            inside: {
                'file-descriptor': { pattern: /^\d/, alias: 'important' },
            },
        },
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
        number: {
            pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
            lookbehind: !0,
        },
    }),
        (a.inside = e.languages.bash)
    for (
        var s = [
                'comment',
                'function-name',
                'for-or-select',
                'assign-left',
                'parameter',
                'string',
                'environment',
                'function',
                'keyword',
                'builtin',
                'boolean',
                'file-descriptor',
                'operator',
                'punctuation',
                'number',
            ],
            o = n.variable[1].inside,
            i = 0;
        i < s.length;
        i++
    )
        o[s[i]] = e.languages.bash[s[i]]
    ;(e.languages.sh = e.languages.bash), (e.languages.shell = e.languages.bash)
})(Prism)
;(Prism.languages.c = Prism.languages.extend('clike', {
    comment: {
        pattern:
            /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: !0,
    },
    string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
    'class-name': {
        pattern:
            /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
        lookbehind: !0,
    },
    keyword:
        /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
    function: /\b[a-z_]\w*(?=\s*\()/i,
    number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
})),
    Prism.languages.insertBefore('c', 'string', {
        char: {
            pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
            greedy: !0,
        },
    }),
    Prism.languages.insertBefore('c', 'string', {
        macro: {
            pattern:
                /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
            lookbehind: !0,
            greedy: !0,
            alias: 'property',
            inside: {
                string: [
                    { pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 },
                    Prism.languages.c.string,
                ],
                char: Prism.languages.c.char,
                comment: Prism.languages.c.comment,
                'macro-name': [
                    { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
                    {
                        pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
                        lookbehind: !0,
                        alias: 'function',
                    },
                ],
                directive: {
                    pattern: /^(#\s*)[a-z]+/,
                    lookbehind: !0,
                    alias: 'keyword',
                },
                'directive-hash': /^#/,
                punctuation: /##|\\(?=[\r\n])/,
                expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c },
            },
        },
    }),
    Prism.languages.insertBefore('c', 'function', {
        constant:
            /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/,
    }),
    delete Prism.languages.c.boolean
!(function (e) {
    var t =
            /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
        n = '\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b'.replace(
            /<keyword>/g,
            function () {
                return t.source
            },
        )
    ;(e.languages.cpp = e.languages.extend('c', {
        'class-name': [
            {
                pattern: RegExp(
                    '(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+'.replace(
                        /<keyword>/g,
                        function () {
                            return t.source
                        },
                    ),
                ),
                lookbehind: !0,
            },
            /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
            /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
            /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
        ],
        keyword: t,
        number: {
            pattern:
                /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
            greedy: !0,
        },
        operator:
            />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
        boolean: /\b(?:false|true)\b/,
    })),
        e.languages.insertBefore('cpp', 'string', {
            module: {
                pattern: RegExp(
                    '(\\b(?:import|module)\\s+)(?:"(?:\\\\(?:\r\n|[^])|[^"\\\\\r\n])*"|<[^<>\r\n]*>|' +
                        '<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>'.replace(
                            /<mod-name>/g,
                            function () {
                                return n
                            },
                        ) +
                        ')',
                ),
                lookbehind: !0,
                greedy: !0,
                inside: {
                    string: /^[<"][\s\S]+/,
                    operator: /:/,
                    punctuation: /\./,
                },
            },
            'raw-string': {
                pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
                alias: 'string',
                greedy: !0,
            },
        }),
        e.languages.insertBefore('cpp', 'keyword', {
            'generic-function': {
                pattern:
                    /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
                inside: {
                    function: /^\w+/,
                    generic: {
                        pattern: /<[\s\S]+/,
                        alias: 'class-name',
                        inside: e.languages.cpp,
                    },
                },
            },
        }),
        e.languages.insertBefore('cpp', 'operator', {
            'double-colon': { pattern: /::/, alias: 'punctuation' },
        }),
        e.languages.insertBefore('cpp', 'class-name', {
            'base-clause': {
                pattern:
                    /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
                lookbehind: !0,
                greedy: !0,
                inside: e.languages.extend('cpp', {}),
            },
        }),
        e.languages.insertBefore(
            'inside',
            'double-colon',
            { 'class-name': /\b[a-z_]\w*\b(?!\s*::)/i },
            e.languages.cpp['base-clause'],
        )
})(Prism)
!(function (e) {
    var a,
        n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
    ;(e.languages.css.selector = {
        pattern: e.languages.css.selector.pattern,
        lookbehind: !0,
        inside: (a = {
            'pseudo-element':
                /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
            'pseudo-class': /:[-\w]+/,
            class: /\.[-\w]+/,
            id: /#[-\w]+/,
            attribute: {
                pattern: RegExp('\\[(?:[^[\\]"\']|' + n.source + ')*\\]'),
                greedy: !0,
                inside: {
                    punctuation: /^\[|\]$/,
                    'case-sensitivity': {
                        pattern: /(\s)[si]$/i,
                        lookbehind: !0,
                        alias: 'keyword',
                    },
                    namespace: {
                        pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
                        lookbehind: !0,
                        inside: { punctuation: /\|$/ },
                    },
                    'attr-name': {
                        pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
                        lookbehind: !0,
                    },
                    'attr-value': [
                        n,
                        {
                            pattern:
                                /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
                            lookbehind: !0,
                        },
                    ],
                    operator: /[|~*^$]?=/,
                },
            },
            'n-th': [
                {
                    pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
                    lookbehind: !0,
                    inside: { number: /[\dn]+/, operator: /[+-]/ },
                },
                { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
            ],
            combinator: />|\+|~|\|\|/,
            punctuation: /[(),]/,
        }),
    }),
        (e.languages.css.atrule.inside['selector-function-argument'].inside =
            a),
        e.languages.insertBefore('css', 'property', {
            variable: {
                pattern:
                    /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
                lookbehind: !0,
            },
        })
    var r = { pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/, lookbehind: !0 },
        i = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 }
    e.languages.insertBefore('css', 'function', {
        operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
        hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: 'color' },
        color: [
            {
                pattern:
                    /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
                lookbehind: !0,
            },
            {
                pattern:
                    /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
                inside: {
                    unit: r,
                    number: i,
                    function: /[\w-]+(?=\()/,
                    punctuation: /[(),]/,
                },
            },
        ],
        entity: /\\[\da-f]{1,8}/i,
        unit: r,
        number: i,
    })
})(Prism)
!(function (e) {
    e.languages.diff = {
        coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m],
    }
    var n = {
        'deleted-sign': '-',
        'deleted-arrow': '<',
        'inserted-sign': '+',
        'inserted-arrow': '>',
        unchanged: ' ',
        diff: '!',
    }
    Object.keys(n).forEach(function (a) {
        var i = n[a],
            r = []
        ;/^\w+$/.test(a) || r.push(/\w+/.exec(a)[0]),
            'diff' === a && r.push('bold'),
            (e.languages.diff[a] = {
                pattern: RegExp(
                    '^(?:[' + i + '].*(?:\r\n?|\n|(?![\\s\\S])))+',
                    'm',
                ),
                alias: r,
                inside: {
                    line: {
                        pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
                        lookbehind: !0,
                    },
                    prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(a)[0] },
                },
            })
    }),
        Object.defineProperty(e.languages.diff, 'PREFIXES', { value: n })
})(Prism)
!(function (e) {
    var n = '(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)'.replace(
            /<SP_BS>/g,
            function () {
                return '\\\\[\r\n](?:\\s|\\\\[\r\n]|#.*(?!.))*(?![\\s#]|\\\\[\r\n])'
            },
        ),
        r =
            '"(?:[^"\\\\\r\n]|\\\\(?:\r\n|[^]))*"|\'(?:[^\'\\\\\r\n]|\\\\(?:\r\n|[^]))*\'',
        t = '--[\\w-]+=(?:<STR>|(?!["\'])(?:[^\\s\\\\]|\\\\.)+)'.replace(
            /<STR>/g,
            function () {
                return r
            },
        ),
        o = { pattern: RegExp(r), greedy: !0 },
        i = { pattern: /(^[ \t]*)#.*/m, lookbehind: !0, greedy: !0 }
    function a(e, r) {
        return (
            (e = e
                .replace(/<OPT>/g, function () {
                    return t
                })
                .replace(/<SP>/g, function () {
                    return n
                })),
            RegExp(e, r)
        )
    }
    ;(e.languages.docker = {
        instruction: {
            pattern:
                /(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,
            lookbehind: !0,
            greedy: !0,
            inside: {
                options: {
                    pattern: a(
                        '(^(?:ONBUILD<SP>)?\\w+<SP>)<OPT>(?:<SP><OPT>)*',
                        'i',
                    ),
                    lookbehind: !0,
                    greedy: !0,
                    inside: {
                        property: { pattern: /(^|\s)--[\w-]+/, lookbehind: !0 },
                        string: [
                            o,
                            {
                                pattern: /(=)(?!["'])(?:[^\s\\]|\\.)+/,
                                lookbehind: !0,
                            },
                        ],
                        operator: /\\$/m,
                        punctuation: /=/,
                    },
                },
                keyword: [
                    {
                        pattern: a(
                            '(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\\b',
                            'i',
                        ),
                        lookbehind: !0,
                        greedy: !0,
                    },
                    {
                        pattern: a(
                            '(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\\\]+<SP>)AS',
                            'i',
                        ),
                        lookbehind: !0,
                        greedy: !0,
                    },
                    {
                        pattern: a('(^ONBUILD<SP>)\\w+', 'i'),
                        lookbehind: !0,
                        greedy: !0,
                    },
                    { pattern: /^\w+/, greedy: !0 },
                ],
                comment: i,
                string: o,
                variable: /\$(?:\w+|\{[^{}"'\\]*\})/,
                operator: /\\$/m,
            },
        },
        comment: i,
    }),
        (e.languages.dockerfile = e.languages.docker)
})(Prism)
Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
    command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/ } },
    coord: /^@@.*@@$/m,
    'commit-sha1': /^commit \w{40}$/m,
}
!(function (a) {
    function e(a, e) {
        return RegExp(
            a.replace(/<ID>/g, function () {
                return '(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*'
            }),
            e,
        )
    }
    a.languages.insertBefore('javascript', 'function-variable', {
        'method-variable': {
            pattern: RegExp(
                '(\\.\\s*)' +
                    a.languages.javascript['function-variable'].pattern.source,
            ),
            lookbehind: !0,
            alias: [
                'function-variable',
                'method',
                'function',
                'property-access',
            ],
        },
    }),
        a.languages.insertBefore('javascript', 'function', {
            method: {
                pattern: RegExp(
                    '(\\.\\s*)' + a.languages.javascript.function.source,
                ),
                lookbehind: !0,
                alias: ['function', 'property-access'],
            },
        }),
        a.languages.insertBefore('javascript', 'constant', {
            'known-class-name': [
                {
                    pattern:
                        /\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/,
                    alias: 'class-name',
                },
                { pattern: /\b(?:[A-Z]\w*)Error\b/, alias: 'class-name' },
            ],
        }),
        a.languages.insertBefore('javascript', 'keyword', {
            imports: {
                pattern: e(
                    '(\\bimport\\b\\s*)(?:<ID>(?:\\s*,\\s*(?:\\*\\s*as\\s+<ID>|\\{[^{}]*\\}))?|\\*\\s*as\\s+<ID>|\\{[^{}]*\\})(?=\\s*\\bfrom\\b)',
                ),
                lookbehind: !0,
                inside: a.languages.javascript,
            },
            exports: {
                pattern: e(
                    '(\\bexport\\b\\s*)(?:\\*(?:\\s*as\\s+<ID>)?(?=\\s*\\bfrom\\b)|\\{[^{}]*\\})',
                ),
                lookbehind: !0,
                inside: a.languages.javascript,
            },
        }),
        a.languages.javascript.keyword.unshift(
            {
                pattern: /\b(?:as|default|export|from|import)\b/,
                alias: 'module',
            },
            {
                pattern:
                    /\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/,
                alias: 'control-flow',
            },
            { pattern: /\bnull\b/, alias: ['null', 'nil'] },
            { pattern: /\bundefined\b/, alias: 'nil' },
        ),
        a.languages.insertBefore('javascript', 'operator', {
            spread: { pattern: /\.{3}/, alias: 'operator' },
            arrow: { pattern: /=>/, alias: 'operator' },
        }),
        a.languages.insertBefore('javascript', 'punctuation', {
            'property-access': {
                pattern: e('(\\.\\s*)#?<ID>'),
                lookbehind: !0,
            },
            'maybe-class-name': {
                pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
                lookbehind: !0,
            },
            dom: {
                pattern:
                    /\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/,
                alias: 'variable',
            },
            console: { pattern: /\bconsole(?=\s*\.)/, alias: 'class-name' },
        })
    for (
        var t = [
                'function',
                'function-variable',
                'method',
                'method-variable',
                'property-access',
            ],
            r = 0;
        r < t.length;
        r++
    ) {
        var n = t[r],
            s = a.languages.javascript[n]
        'RegExp' === a.util.type(s) &&
            (s = a.languages.javascript[n] = { pattern: s })
        var o = s.inside || {}
        ;(s.inside = o), (o['maybe-class-name'] = /^[A-Z][\s\S]*/)
    }
})(Prism)
;(Prism.languages.json = {
    property: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
        lookbehind: !0,
        greedy: !0,
    },
    string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        lookbehind: !0,
        greedy: !0,
    },
    comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:false|true)\b/,
    null: { pattern: /\bnull\b/, alias: 'keyword' },
}),
    (Prism.languages.webmanifest = Prism.languages.json)
!(function (n) {
    var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/
    n.languages.json5 = n.languages.extend('json', {
        property: [
            { pattern: RegExp(e.source + '(?=\\s*:)'), greedy: !0 },
            {
                pattern:
                    /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
                alias: 'unquoted',
            },
        ],
        string: { pattern: e, greedy: !0 },
        number: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
    })
})(Prism)
;(Prism.languages.jsonp = Prism.languages.extend('json', {
    punctuation: /[{}[\]();,.]/,
})),
    Prism.languages.insertBefore('jsonp', 'punctuation', {
        function:
            /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/,
    })
!(function (e) {
    var n = /\$(?:\w[a-z\d]*(?:_[^\x00-\x1F\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i
    e.languages.nginx = {
        comment: { pattern: /(^|[\s{};])#.*/, lookbehind: !0, greedy: !0 },
        directive: {
            pattern:
                /(^|\s)\w(?:[^;{}"'\\\s]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/,
            lookbehind: !0,
            greedy: !0,
            inside: {
                string: {
                    pattern:
                        /((?:^|[^\\])(?:\\\\)*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/,
                    lookbehind: !0,
                    greedy: !0,
                    inside: {
                        escape: { pattern: /\\["'\\nrt]/, alias: 'entity' },
                        variable: n,
                    },
                },
                comment: { pattern: /(\s)#.*/, lookbehind: !0, greedy: !0 },
                keyword: { pattern: /^\S+/, greedy: !0 },
                boolean: { pattern: /(\s)(?:off|on)(?!\S)/, lookbehind: !0 },
                number: { pattern: /(\s)\d+[a-z]*(?!\S)/i, lookbehind: !0 },
                variable: n,
            },
        },
        punctuation: /[{};]/,
    }
})(Prism)
;(Prism.languages.python = {
    comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
    'string-interpolation': {
        pattern:
            /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
        greedy: !0,
        inside: {
            interpolation: {
                pattern:
                    /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
                lookbehind: !0,
                inside: {
                    'format-spec': {
                        pattern: /(:)[^:(){}]+(?=\}$)/,
                        lookbehind: !0,
                    },
                    'conversion-option': {
                        pattern: /![sra](?=[:}]$)/,
                        alias: 'punctuation',
                    },
                    rest: null,
                },
            },
            string: /[\s\S]+/,
        },
    },
    'triple-quoted-string': {
        pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
        greedy: !0,
        alias: 'string',
    },
    string: {
        pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
        greedy: !0,
    },
    function: {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
        lookbehind: !0,
    },
    'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
    decorator: {
        pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
        lookbehind: !0,
        alias: ['annotation', 'punctuation'],
        inside: { punctuation: /\./ },
    },
    keyword:
        /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin:
        /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:False|None|True)\b/,
    number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
    operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/,
}),
    (Prism.languages.python[
        'string-interpolation'
    ].inside.interpolation.inside.rest = Prism.languages.python),
    (Prism.languages.py = Prism.languages.python)
!(function (t) {
    var n = t.util.clone(t.languages.javascript),
        e = '(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})'
    function a(t, n) {
        return (
            (t = t
                .replace(/<S>/g, function () {
                    return '(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)'
                })
                .replace(/<BRACES>/g, function () {
                    return '(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})'
                })
                .replace(/<SPREAD>/g, function () {
                    return e
                })),
            RegExp(t, n)
        )
    }
    ;(e = a(e).source),
        (t.languages.jsx = t.languages.extend('markup', n)),
        (t.languages.jsx.tag.pattern = a(
            '</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:"(?:\\\\[^]|[^\\\\"])*"|\'(?:\\\\[^]|[^\\\\\'])*\'|[^\\s{\'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>',
        )),
        (t.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/),
        (t.languages.jsx.tag.inside['attr-value'].pattern =
            /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/),
        (t.languages.jsx.tag.inside.tag.inside['class-name'] =
            /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
        (t.languages.jsx.tag.inside.comment = n.comment),
        t.languages.insertBefore(
            'inside',
            'attr-name',
            { spread: { pattern: a('<SPREAD>'), inside: t.languages.jsx } },
            t.languages.jsx.tag,
        ),
        t.languages.insertBefore(
            'inside',
            'special-attr',
            {
                script: {
                    pattern: a('=<BRACES>'),
                    alias: 'language-javascript',
                    inside: {
                        'script-punctuation': {
                            pattern: /^=(?=\{)/,
                            alias: 'punctuation',
                        },
                        rest: t.languages.jsx,
                    },
                },
            },
            t.languages.jsx.tag,
        )
    var s = function (t) {
            return t
                ? 'string' == typeof t
                    ? t
                    : 'string' == typeof t.content
                    ? t.content
                    : t.content.map(s).join('')
                : ''
        },
        g = function (n) {
            for (var e = [], a = 0; a < n.length; a++) {
                var o = n[a],
                    i = !1
                if (
                    ('string' != typeof o &&
                        ('tag' === o.type &&
                        o.content[0] &&
                        'tag' === o.content[0].type
                            ? '</' === o.content[0].content[0].content
                                ? e.length > 0 &&
                                  e[e.length - 1].tagName ===
                                      s(o.content[0].content[1]) &&
                                  e.pop()
                                : '/>' ===
                                      o.content[o.content.length - 1].content ||
                                  e.push({
                                      tagName: s(o.content[0].content[1]),
                                      openedBraces: 0,
                                  })
                            : e.length > 0 &&
                              'punctuation' === o.type &&
                              '{' === o.content
                            ? e[e.length - 1].openedBraces++
                            : e.length > 0 &&
                              e[e.length - 1].openedBraces > 0 &&
                              'punctuation' === o.type &&
                              '}' === o.content
                            ? e[e.length - 1].openedBraces--
                            : (i = !0)),
                    (i || 'string' == typeof o) &&
                        e.length > 0 &&
                        0 === e[e.length - 1].openedBraces)
                ) {
                    var r = s(o)
                    a < n.length - 1 &&
                        ('string' == typeof n[a + 1] ||
                            'plain-text' === n[a + 1].type) &&
                        ((r += s(n[a + 1])), n.splice(a + 1, 1)),
                        a > 0 &&
                            ('string' == typeof n[a - 1] ||
                                'plain-text' === n[a - 1].type) &&
                            ((r = s(n[a - 1]) + r), n.splice(a - 1, 1), a--),
                        (n[a] = new t.Token('plain-text', r, null, r))
                }
                o.content && 'string' != typeof o.content && g(o.content)
            }
        }
    t.hooks.add('after-tokenize', function (t) {
        ;('jsx' !== t.language && 'tsx' !== t.language) || g(t.tokens)
    })
})(Prism)
!(function (e) {
    ;(e.languages.typescript = e.languages.extend('javascript', {
        'class-name': {
            pattern:
                /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
            lookbehind: !0,
            greedy: !0,
            inside: null,
        },
        builtin:
            /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
    })),
        e.languages.typescript.keyword.push(
            /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
            /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
            /\btype\b(?=\s*(?:[\{*]|$))/,
        ),
        delete e.languages.typescript.parameter,
        delete e.languages.typescript['literal-property']
    var s = e.languages.extend('typescript', {})
    delete s['class-name'],
        (e.languages.typescript['class-name'].inside = s),
        e.languages.insertBefore('typescript', 'function', {
            decorator: {
                pattern: /@[$\w\xA0-\uFFFF]+/,
                inside: {
                    at: { pattern: /^@/, alias: 'operator' },
                    function: /^[\s\S]+/,
                },
            },
            'generic-function': {
                pattern:
                    /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
                greedy: !0,
                inside: {
                    function:
                        /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
                    generic: {
                        pattern: /<[\s\S]+/,
                        alias: 'class-name',
                        inside: s,
                    },
                },
            },
        }),
        (e.languages.ts = e.languages.typescript)
})(Prism)
!(function (e) {
    var a = e.util.clone(e.languages.typescript)
    ;(e.languages.tsx = e.languages.extend('jsx', a)),
        delete e.languages.tsx.parameter,
        delete e.languages.tsx['literal-property']
    var t = e.languages.tsx.tag
    ;(t.pattern = RegExp(
        '(^|[^\\w$]|(?=</))(?:' + t.pattern.source + ')',
        t.pattern.flags,
    )),
        (t.lookbehind = !0)
})(Prism)
!(function (e) {
    for (
        var a = '/\\*(?:[^*/]|\\*(?!/)|/(?!\\*)|<self>)*\\*/', t = 0;
        t < 2;
        t++
    )
        a = a.replace(/<self>/g, function () {
            return a
        })
    ;(a = a.replace(/<self>/g, function () {
        return '[^\\s\\S]'
    })),
        (e.languages.rust = {
            comment: [
                {
                    pattern: RegExp('(^|[^\\\\])' + a),
                    lookbehind: !0,
                    greedy: !0,
                },
                { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
            ],
            string: {
                pattern:
                    /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
                greedy: !0,
            },
            char: {
                pattern:
                    /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
                greedy: !0,
            },
            attribute: {
                pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
                greedy: !0,
                alias: 'attr-name',
                inside: { string: null },
            },
            'closure-params': {
                pattern:
                    /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
                lookbehind: !0,
                greedy: !0,
                inside: {
                    'closure-punctuation': {
                        pattern: /^\||\|$/,
                        alias: 'punctuation',
                    },
                    rest: null,
                },
            },
            'lifetime-annotation': { pattern: /'\w+/, alias: 'symbol' },
            'fragment-specifier': {
                pattern: /(\$\w+:)[a-z]+/,
                lookbehind: !0,
                alias: 'punctuation',
            },
            variable: /\$\w+/,
            'function-definition': {
                pattern: /(\bfn\s+)\w+/,
                lookbehind: !0,
                alias: 'function',
            },
            'type-definition': {
                pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
                lookbehind: !0,
                alias: 'class-name',
            },
            'module-declaration': [
                {
                    pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
                    lookbehind: !0,
                    alias: 'namespace',
                },
                {
                    pattern:
                        /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
                    lookbehind: !0,
                    alias: 'namespace',
                    inside: { punctuation: /::/ },
                },
            ],
            keyword: [
                /\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
                /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/,
            ],
            function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
            macro: { pattern: /\b\w+!/, alias: 'property' },
            constant: /\b[A-Z_][A-Z_\d]+\b/,
            'class-name': /\b[A-Z]\w*\b/,
            namespace: {
                pattern:
                    /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
                inside: { punctuation: /::/ },
            },
            number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
            boolean: /\b(?:false|true)\b/,
            punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
            operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/,
        }),
        (e.languages.rust['closure-params'].inside.rest = e.languages.rust),
        (e.languages.rust.attribute.inside.string = e.languages.rust.string)
})(Prism)
!(function (e) {
    ;(e.languages.sass = e.languages.extend('css', {
        comment: {
            pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
            lookbehind: !0,
            greedy: !0,
        },
    })),
        e.languages.insertBefore('sass', 'atrule', {
            'atrule-line': {
                pattern: /^(?:[ \t]*)[@+=].+/m,
                greedy: !0,
                inside: { atrule: /(?:@[\w-]+|[+=])/ },
            },
        }),
        delete e.languages.sass.atrule
    var r = /\$[-\w]+|#\{\$[-\w]+\}/,
        t = [
            /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|not|or)\b/,
            { pattern: /(\s)-(?=\s)/, lookbehind: !0 },
        ]
    e.languages.insertBefore('sass', 'property', {
        'variable-line': {
            pattern: /^[ \t]*\$.+/m,
            greedy: !0,
            inside: { punctuation: /:/, variable: r, operator: t },
        },
        'property-line': {
            pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
            greedy: !0,
            inside: {
                property: [
                    /[^:\s]+(?=\s*:)/,
                    { pattern: /(:)[^:\s]+/, lookbehind: !0 },
                ],
                punctuation: /:/,
                variable: r,
                operator: t,
                important: e.languages.sass.important,
            },
        },
    }),
        delete e.languages.sass.property,
        delete e.languages.sass.important,
        e.languages.insertBefore('sass', 'punctuation', {
            selector: {
                pattern:
                    /^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/m,
                lookbehind: !0,
                greedy: !0,
            },
        })
})(Prism)
;(Prism.languages.scss = Prism.languages.extend('css', {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
    },
    atrule: {
        pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
        inside: { rule: /@[\w-]+/ },
    },
    url: /(?:[-a-z]+-)?url(?=\()/i,
    selector: {
        pattern:
            /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
        inside: {
            parent: { pattern: /&/, alias: 'important' },
            placeholder: /%[-\w]+/,
            variable: /\$[-\w]+|#\{\$[-\w]+\}/,
        },
    },
    property: {
        pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
        inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
    },
})),
    Prism.languages.insertBefore('scss', 'atrule', {
        keyword: [
            /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
            { pattern: /( )(?:from|through)(?= )/, lookbehind: !0 },
        ],
    }),
    Prism.languages.insertBefore('scss', 'important', {
        variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    }),
    Prism.languages.insertBefore('scss', 'function', {
        'module-modifier': {
            pattern: /\b(?:as|hide|show|with)\b/i,
            alias: 'keyword',
        },
        placeholder: { pattern: /%[-\w]+/, alias: 'selector' },
        statement: { pattern: /\B!(?:default|optional)\b/i, alias: 'keyword' },
        boolean: /\b(?:false|true)\b/,
        null: { pattern: /\bnull\b/, alias: 'keyword' },
        operator: {
            pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
            lookbehind: !0,
        },
    }),
    (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss)
Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: !0,
    },
    variable: [
        { pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 },
        /@[\w.$]+/,
    ],
    string: {
        pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
        greedy: !0,
        lookbehind: !0,
    },
    identifier: {
        pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /^`|`$/ },
    },
    function:
        /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword:
        /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
    operator:
        /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/,
}
Prism.languages.vim = {
    string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
    comment: /".*/,
    function: /\b\w+(?=\()/,
    keyword:
        /\b(?:N|Next|P|Print|X|XMLent|XMLns|ab|abbreviate|abc|abclear|abo|aboveleft|al|all|ar|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|args|argu|argument|as|ascii|b|bN|bNext|ba|bad|badd|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bo|botright|bp|bprevious|br|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|brewind|bro|browse|bufdo|buffer|buffers|bun|bunload|bw|bwipeout|c|cN|cNext|cNfcNfile|ca|cabbrev|cabc|cabclear|cad|caddb|caddbuffer|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cg|cgetb|cgetbuffer|cgete|cgetexpr|cgetfile|change|changes|chd|chdir|che|checkpath|checkt|checktime|cl|cla|clast|clist|clo|close|cmapc|cmapclear|cn|cnew|cnewer|cnext|cnf|cnfile|cnorea|cnoreabbrev|co|col|colder|colo|colorscheme|comc|comclear|comp|compiler|con|conf|confirm|continue|cope|copen|copy|cp|cpf|cpfile|cprevious|cq|cquit|cr|crewind|cu|cuna|cunabbrev|cunmap|cw|cwindow|d|debugg|debuggreedy|delc|delcommand|delete|delf|delfunction|delm|delmarks|di|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|e|earlier|echoe|echoerr|echom|echomsg|echon|edit|el|else|elsei|elseif|em|emenu|en|endf|endfo|endfor|endfun|endfunction|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fin|fina|finally|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|foldd|folddoc|folddoclosed|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|h|ha|hardcopy|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iu|iuna|iunabbrev|iunmap|j|join|ju|jumps|k|kee|keepalt|keepj|keepjumps|keepmarks|l|lN|lNext|lNf|lNfile|la|lad|laddb|laddbuffer|laddexpr|laddf|laddfile|lan|language|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|left|lefta|leftabove|let|lex|lexpr|lf|lfile|lfir|lfirst|lg|lgetb|lgetbuffer|lgete|lgetexpr|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|list|ll|lla|llast|lli|llist|lm|lmak|lmake|lmap|lmapc|lmapclear|ln|lne|lnew|lnewer|lnext|lnf|lnfile|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lp|lpf|lpfile|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|m|ma|mak|make|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkv|mkvie|mkview|mkvimrc|mod|mode|move|mz|mzf|mzfile|mzscheme|n|nbkey|new|next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|o|omapc|omapclear|on|only|open|opt|options|ou|ounmap|p|pc|pclose|pe|ped|pedit|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|print|prof|profd|profdel|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|ptN|ptNext|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|py|pyf|pyfile|python|q|qa|qall|quit|quita|quitall|r|read|rec|recover|red|redi|redir|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|ru|rub|ruby|rubyd|rubydo|rubyf|rubyfile|runtime|rv|rviminfo|sN|sNext|sa|sal|sall|san|sandbox|sargument|sav|saveas|sb|sbN|sbNext|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbp|sbprevious|sbr|sbrewind|sbuffer|scrip|scripte|scriptencoding|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sl|sla|slast|sleep|sm|smagic|smap|smapc|smapclear|sme|smenu|sn|snext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|so|sor|sort|source|sp|spe|spelld|spelldump|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|split|spr|sprevious|sre|srewind|st|sta|stag|star|startg|startgreplace|startinsert|startr|startreplace|stj|stjump|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tN|tNext|ta|tab|tabN|tabNext|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabn|tabnew|tabnext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tmenu|tn|tnext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tunmenu|u|una|unabbreviate|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|ve|verb|verbose|version|vert|vertical|vi|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|w|wN|wNext|wa|wall|wh|while|win|winc|wincmd|windo|winp|winpos|winsize|wn|wnext|wp|wprevious|wq|wqa|wqall|write|ws|wsverb|wv|wviminfo|x|xa|xall|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
    builtin:
        /\b(?:acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autocmd|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|t_AB|t_AF|t_AL|t_CS|t_CV|t_Ce|t_Co|t_Cs|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_IE|t_IS|t_K1|t_K3|t_K4|t_K5|t_K6|t_K7|t_K8|t_K9|t_KA|t_KB|t_KC|t_KD|t_KE|t_KF|t_KG|t_KH|t_KI|t_KJ|t_KK|t_KL|t_RI|t_RV|t_SI|t_Sb|t_Sf|t_WP|t_WS|t_ZH|t_ZR|t_al|t_bc|t_cd|t_ce|t_cl|t_cm|t_cs|t_da|t_db|t_dl|t_fs|t_k1|t_k2|t_k3|t_k4|t_k5|t_k6|t_k7|t_k8|t_k9|t_kB|t_kD|t_kI|t_kN|t_kP|t_kb|t_kd|t_ke|t_kh|t_kl|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_se|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_xs|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww)\b/,
    number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
    operator:
        /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
    punctuation: /[{}[\](),;:]/,
}
Prism.languages.wasm = {
    comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
    string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
    keyword: [
        { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
        {
            pattern:
                /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|neg?|nearest|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|sqrt|store(?:8|16|32)?|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
            inside: { punctuation: /\./ },
        },
        /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/,
    ],
    variable: /\$[\w!#$%&'*+\-./:<=>?@\\^`|~]+/,
    number: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
    punctuation: /[()]/,
}
!(function (a) {
    function e(e, n) {
        a.languages[e] &&
            a.languages.insertBefore(e, 'comment', { 'doc-comment': n })
    }
    var n = a.languages.markup.tag,
        t = {
            pattern: /\/\/\/.*/,
            greedy: !0,
            alias: 'comment',
            inside: { tag: n },
        },
        g = {
            pattern: /'''.*/,
            greedy: !0,
            alias: 'comment',
            inside: { tag: n },
        }
    e('csharp', t), e('fsharp', t), e('vbnet', g)
})(Prism)
!(function () {
    if ('undefined' != typeof Prism && 'undefined' != typeof document) {
        var e = 'line-numbers',
            n = /\n(?!$)/g,
            t = (Prism.plugins.lineNumbers = {
                getLine: function (n, t) {
                    if ('PRE' === n.tagName && n.classList.contains(e)) {
                        var i = n.querySelector('.line-numbers-rows')
                        if (i) {
                            var r =
                                    parseInt(
                                        n.getAttribute('data-start'),
                                        10,
                                    ) || 1,
                                s = r + (i.children.length - 1)
                            t < r && (t = r), t > s && (t = s)
                            var l = t - r
                            return i.children[l]
                        }
                    }
                },
                resize: function (e) {
                    r([e])
                },
                assumeViewportIndependence: !0,
            }),
            i = void 0
        window.addEventListener('resize', function () {
            ;(t.assumeViewportIndependence && i === window.innerWidth) ||
                ((i = window.innerWidth),
                r(
                    Array.prototype.slice.call(
                        document.querySelectorAll('pre.line-numbers'),
                    ),
                ))
        }),
            Prism.hooks.add('complete', function (t) {
                if (t.code) {
                    var i = t.element,
                        s = i.parentNode
                    if (
                        s &&
                        /pre/i.test(s.nodeName) &&
                        !i.querySelector('.line-numbers-rows') &&
                        Prism.util.isActive(i, e)
                    ) {
                        i.classList.remove(e), s.classList.add(e)
                        var l,
                            o = t.code.match(n),
                            a = o ? o.length + 1 : 1,
                            u = new Array(a + 1).join('<span></span>')
                        ;(l = document.createElement('span')).setAttribute(
                            'aria-hidden',
                            'true',
                        ),
                            (l.className = 'line-numbers-rows'),
                            (l.innerHTML = u),
                            s.hasAttribute('data-start') &&
                                (s.style.counterReset =
                                    'linenumber ' +
                                    (parseInt(
                                        s.getAttribute('data-start'),
                                        10,
                                    ) -
                                        1)),
                            t.element.appendChild(l),
                            r([s]),
                            Prism.hooks.run('line-numbers', t)
                    }
                }
            }),
            Prism.hooks.add('line-numbers', function (e) {
                ;(e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0)
            })
    }
    function r(e) {
        if (
            0 !=
            (e = e.filter(function (e) {
                var n,
                    t = ((n = e),
                    n
                        ? window.getComputedStyle
                            ? getComputedStyle(n)
                            : n.currentStyle || null
                        : null)['white-space']
                return 'pre-wrap' === t || 'pre-line' === t
            })).length
        ) {
            var t = e
                .map(function (e) {
                    var t = e.querySelector('code'),
                        i = e.querySelector('.line-numbers-rows')
                    if (t && i) {
                        var r = e.querySelector('.line-numbers-sizer'),
                            s = t.textContent.split(n)
                        r ||
                            (((r = document.createElement('span')).className =
                                'line-numbers-sizer'),
                            t.appendChild(r)),
                            (r.innerHTML = '0'),
                            (r.style.display = 'block')
                        var l = r.getBoundingClientRect().height
                        return (
                            (r.innerHTML = ''),
                            {
                                element: e,
                                lines: s,
                                lineHeights: [],
                                oneLinerHeight: l,
                                sizer: r,
                            }
                        )
                    }
                })
                .filter(Boolean)
            t.forEach(function (e) {
                var n = e.sizer,
                    t = e.lines,
                    i = e.lineHeights,
                    r = e.oneLinerHeight
                ;(i[t.length - 1] = void 0),
                    t.forEach(function (e, t) {
                        if (e && e.length > 1) {
                            var s = n.appendChild(
                                document.createElement('span'),
                            )
                            ;(s.style.display = 'block'), (s.textContent = e)
                        } else i[t] = r
                    })
            }),
                t.forEach(function (e) {
                    for (
                        var n = e.sizer, t = e.lineHeights, i = 0, r = 0;
                        r < t.length;
                        r++
                    )
                        void 0 === t[r] &&
                            (t[r] =
                                n.children[i++].getBoundingClientRect().height)
                }),
                t.forEach(function (e) {
                    var n = e.sizer,
                        t = e.element.querySelector('.line-numbers-rows')
                    ;(n.style.display = 'none'),
                        (n.innerHTML = ''),
                        e.lineHeights.forEach(function (e, n) {
                            t.children[n].style.height = e + 'px'
                        })
                })
        }
    }
})()
!(function () {
    if ('undefined' != typeof Prism && 'undefined' != typeof document) {
        var t = []
        o(function (t) {
            if (t && t.meta && t.data) {
                if (t.meta.status && t.meta.status >= 400)
                    return 'Error: ' + (t.data.message || t.meta.status)
                if ('string' == typeof t.data.content)
                    return 'function' == typeof atob
                        ? atob(t.data.content.replace(/\s/g, ''))
                        : 'Your browser cannot decode base64'
            }
            return null
        }, 'github'),
            o(function (t, e) {
                if (t && t.meta && t.data && t.data.files) {
                    if (t.meta.status && t.meta.status >= 400)
                        return 'Error: ' + (t.data.message || t.meta.status)
                    var n = t.data.files,
                        a = e.getAttribute('data-filename')
                    if (null == a)
                        for (var r in n)
                            if (n.hasOwnProperty(r)) {
                                a = r
                                break
                            }
                    return void 0 !== n[a]
                        ? n[a].content
                        : 'Error: unknown or missing gist file ' + a
                }
                return null
            }, 'gist'),
            o(function (t) {
                return t && t.node && 'string' == typeof t.data ? t.data : null
            }, 'bitbucket')
        var e = 0,
            n = 'data-jsonp-status',
            a = 'failed',
            r =
                'pre[data-jsonp]:not([data-jsonp-status="loaded"]):not([data-jsonp-status="loading"])'
        Prism.hooks.add('before-highlightall', function (t) {
            t.selector += ', ' + r
        }),
            Prism.hooks.add('before-sanity-check', function (o) {
                var i,
                    u = o.element
                if (u.matches(r)) {
                    ;(o.code = ''), u.setAttribute(n, 'loading')
                    var s = u.appendChild(document.createElement('CODE'))
                    s.textContent = 'Loading…'
                    var d = o.language
                    s.className = 'language-' + d
                    var f = Prism.plugins.autoloader
                    f && f.loadLanguages(d)
                    var l = u.getAttribute('data-adapter'),
                        c = null
                    if (l) {
                        if ('function' != typeof window[l])
                            return (
                                u.setAttribute(n, a),
                                void (s.textContent =
                                    ((i = l),
                                    '✖ Error: JSONP adapter function "' +
                                        i +
                                        '" doesn\'t exist'))
                            )
                        c = window[l]
                    }
                    var p = u.getAttribute('data-jsonp')
                    !(function (r, o, i, d) {
                        var f = 'prismjsonp' + e++,
                            l = document.createElement('a')
                        ;(l.href = r),
                            (l.href +=
                                (l.search ? '&' : '?') +
                                (o || 'callback') +
                                '=' +
                                f)
                        var p = document.createElement('script')
                        ;(p.src = l.href),
                            (p.onerror = function () {
                                g(), d()
                            })
                        var m = setTimeout(function () {
                            g(), d()
                        }, Prism.plugins.jsonphighlight.timeout)
                        function g() {
                            clearTimeout(m),
                                document.head.removeChild(p),
                                delete window[f]
                        }
                        ;(window[f] = function (e) {
                            g(),
                                (function (e) {
                                    var r = null
                                    if (c) r = c(e, u)
                                    else
                                        for (
                                            var o = 0, i = t.length;
                                            o < i &&
                                            null === (r = t[o].adapter(e, u));
                                            o++
                                        );
                                    null === r
                                        ? (u.setAttribute(n, a),
                                          (s.textContent =
                                              '✖ Error: Cannot parse response (perhaps you need an adapter function?)'))
                                        : (u.setAttribute(n, 'loaded'),
                                          (s.textContent = r),
                                          Prism.highlightElement(s))
                                })(e)
                        }),
                            document.head.appendChild(p)
                    })(p, u.getAttribute('data-callback'), 0, function () {
                        u.setAttribute(n, a),
                            (s.textContent = '✖ Error: Timeout loading ' + p)
                    })
                }
            }),
            (Prism.plugins.jsonphighlight = {
                timeout: 5e3,
                registerAdapter: o,
                removeAdapter: function (e) {
                    if (
                        ('string' == typeof e && (e = i(e)),
                        'function' == typeof e)
                    ) {
                        var n = t.findIndex(function (t) {
                            return t.adapter === e
                        })
                        n >= 0 && t.splice(n, 1)
                    }
                },
                highlight: function (t) {
                    for (
                        var e, n = (t || document).querySelectorAll(r), a = 0;
                        (e = n[a++]);

                    )
                        Prism.highlightElement(e)
                },
            })
    }
    function o(e, n) {
        ;(n = n || e.name),
            'function' != typeof e ||
                i(e) ||
                i(n) ||
                t.push({ adapter: e, name: n })
    }
    function i(e) {
        if ('function' == typeof e) {
            for (var n = 0; (a = t[n++]); )
                if (a.adapter.valueOf() === e.valueOf()) return a.adapter
        } else if ('string' == typeof e) {
            var a
            for (n = 0; (a = t[n++]); ) if (a.name === e) return a.adapter
        }
        return null
    }
})()
'undefined' != typeof Prism &&
    Prism.hooks.add('wrap', function (e) {
        'keyword' === e.type && e.classes.push('keyword-' + e.content)
    })
!(function () {
    if ('undefined' != typeof Prism && 'undefined' != typeof document) {
        var e = /(?:^|\s)command-line(?:\s|$)/,
            t = 'command-line-prompt',
            n = ''.startsWith
                ? function (e, t) {
                      return e.startsWith(t)
                  }
                : function (e, t) {
                      return 0 === e.indexOf(t)
                  },
            a = ''.endsWith
                ? function (e, t) {
                      return e.endsWith(t)
                  }
                : function (e, t) {
                      var n = e.length
                      return e.substring(n - t.length, n) === t
                  }
        Prism.hooks.add('before-highlight', function (i) {
            var o = r(i)
            if (!o.complete && i.code) {
                var s = i.element.parentElement
                if (
                    s &&
                    /pre/i.test(s.nodeName) &&
                    (e.test(s.className) || e.test(i.element.className))
                ) {
                    var l = i.element.querySelector('.' + t)
                    l && l.remove()
                    var m = i.code.split('\n')
                    o.numberOfLines = m.length
                    var u = (o.outputLines = []),
                        c = s.getAttribute('data-output'),
                        d = s.getAttribute('data-filter-output')
                    if (null !== c)
                        c.split(',').forEach(function (e) {
                            var t = e.split('-'),
                                n = parseInt(t[0], 10),
                                a = 2 === t.length ? parseInt(t[1], 10) : n
                            if (!isNaN(n) && !isNaN(a)) {
                                n < 1 && (n = 1),
                                    a > m.length && (a = m.length),
                                    a--
                                for (var r = --n; r <= a; r++)
                                    (u[r] = m[r]), (m[r] = '')
                            }
                        })
                    else if (d)
                        for (var p = 0; p < m.length; p++)
                            n(m[p], d) &&
                                ((u[p] = m[p].slice(d.length)), (m[p] = ''))
                    for (
                        var f = (o.continuationLineIndicies = new Set()),
                            h = s.getAttribute('data-continuation-str'),
                            v = s.getAttribute('data-filter-continuation'),
                            g = 0;
                        g < m.length;
                        g++
                    ) {
                        var b = m[g]
                        b &&
                            (h && a(b, h) && f.add(g + 1),
                            g > 0 &&
                                v &&
                                n(b, v) &&
                                ((m[g] = b.slice(v.length)), f.add(g)))
                    }
                    i.code = m.join('\n')
                } else o.complete = !0
            } else o.complete = !0
        }),
            Prism.hooks.add('before-insert', function (e) {
                var t = r(e)
                if (!t.complete) {
                    for (
                        var n = e.highlightedCode.split('\n'),
                            a = t.outputLines || [],
                            i = 0,
                            o = n.length;
                        i < o;
                        i++
                    )
                        a.hasOwnProperty(i)
                            ? (n[i] =
                                  '<span class="token output">' +
                                  Prism.util.encode(a[i]) +
                                  '</span>')
                            : (n[i] =
                                  '<span class="token command">' +
                                  n[i] +
                                  '</span>')
                    e.highlightedCode = n.join('\n')
                }
            }),
            Prism.hooks.add('complete', function (n) {
                if (
                    (function (e) {
                        return 'command-line' in (e.vars = e.vars || {})
                    })(n)
                ) {
                    var a = r(n)
                    if (!a.complete) {
                        var i = n.element.parentElement
                        e.test(n.element.className) &&
                            (n.element.className = n.element.className.replace(
                                e,
                                ' ',
                            )),
                            e.test(i.className) ||
                                (i.className += ' command-line')
                        var o,
                            s = '',
                            l = a.numberOfLines || 0,
                            m = b('data-prompt', '')
                        o =
                            '' !== m
                                ? '<span data-prompt="' + m + '"></span>'
                                : '<span data-user="' +
                                  b('data-user', 'user') +
                                  '" data-host="' +
                                  b('data-host', 'localhost') +
                                  '"></span>'
                        for (
                            var u = a.continuationLineIndicies || new Set(),
                                c =
                                    '<span data-continuation-prompt="' +
                                    b('data-continuation-prompt', '>') +
                                    '"></span>',
                                d = 0;
                            d < l;
                            d++
                        )
                            u.has(d) ? (s += c) : (s += o)
                        var p = document.createElement('span')
                        ;(p.className = t), (p.innerHTML = s)
                        for (
                            var f = a.outputLines || [], h = 0, v = f.length;
                            h < v;
                            h++
                        )
                            if (f.hasOwnProperty(h)) {
                                var g = p.children[h]
                                g.removeAttribute('data-user'),
                                    g.removeAttribute('data-host'),
                                    g.removeAttribute('data-prompt')
                            }
                        n.element.insertBefore(p, n.element.firstChild),
                            (a.complete = !0)
                    }
                }
                function b(e, t) {
                    return (i.getAttribute(e) || t).replace(/"/g, '&quot')
                }
            })
    }
    function r(e) {
        var t = (e.vars = e.vars || {})
        return (t['command-line'] = t['command-line'] || {})
    }
})()
!(function () {
    if ('undefined' != typeof Prism) {
        var e =
                Object.assign ||
                function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                    return e
                },
            t = {
                'remove-trailing': 'boolean',
                'remove-indent': 'boolean',
                'left-trim': 'boolean',
                'right-trim': 'boolean',
                'break-lines': 'number',
                indent: 'number',
                'remove-initial-line-feed': 'boolean',
                'tabs-to-spaces': 'number',
                'spaces-to-tabs': 'number',
            }
        ;(n.prototype = {
            setDefaults: function (t) {
                this.defaults = e(this.defaults, t)
            },
            normalize: function (t, n) {
                for (var r in (n = e(this.defaults, n))) {
                    var i = r.replace(/-(\w)/g, function (e, t) {
                        return t.toUpperCase()
                    })
                    'normalize' !== r &&
                        'setDefaults' !== i &&
                        n[r] &&
                        this[i] &&
                        (t = this[i].call(this, t, n[r]))
                }
                return t
            },
            leftTrim: function (e) {
                return e.replace(/^\s+/, '')
            },
            rightTrim: function (e) {
                return e.replace(/\s+$/, '')
            },
            tabsToSpaces: function (e, t) {
                return (
                    (t = 0 | t || 4), e.replace(/\t/g, new Array(++t).join(' '))
                )
            },
            spacesToTabs: function (e, t) {
                return (
                    (t = 0 | t || 4),
                    e.replace(RegExp(' {' + t + '}', 'g'), '\t')
                )
            },
            removeTrailing: function (e) {
                return e.replace(/\s*?$/gm, '')
            },
            removeInitialLineFeed: function (e) {
                return e.replace(/^(?:\r?\n|\r)/, '')
            },
            removeIndent: function (e) {
                var t = e.match(/^[^\S\n\r]*(?=\S)/gm)
                return t && t[0].length
                    ? (t.sort(function (e, t) {
                          return e.length - t.length
                      }),
                      t[0].length ? e.replace(RegExp('^' + t[0], 'gm'), '') : e)
                    : e
            },
            indent: function (e, t) {
                return e.replace(
                    /^[^\S\n\r]*(?=\S)/gm,
                    new Array(++t).join('\t') + '$&',
                )
            },
            breakLines: function (e, t) {
                t = !0 === t ? 80 : 0 | t || 80
                for (var n = e.split('\n'), i = 0; i < n.length; ++i)
                    if (!(r(n[i]) <= t)) {
                        for (
                            var o = n[i].split(/(\s+)/g), a = 0, l = 0;
                            l < o.length;
                            ++l
                        ) {
                            var s = r(o[l])
                            ;(a += s) > t && ((o[l] = '\n' + o[l]), (a = s))
                        }
                        n[i] = o.join('')
                    }
                return n.join('\n')
            },
        }),
            'undefined' != typeof module &&
                module.exports &&
                (module.exports = n),
            (Prism.plugins.NormalizeWhitespace = new n({
                'remove-trailing': !0,
                'remove-indent': !0,
                'left-trim': !0,
                'right-trim': !0,
            })),
            Prism.hooks.add('before-sanity-check', function (e) {
                var n = Prism.plugins.NormalizeWhitespace
                if (
                    (!e.settings ||
                        !1 !== e.settings['whitespace-normalization']) &&
                    Prism.util.isActive(
                        e.element,
                        'whitespace-normalization',
                        !0,
                    )
                )
                    if ((e.element && e.element.parentNode) || !e.code) {
                        var r = e.element.parentNode
                        if (e.code && r && 'pre' === r.nodeName.toLowerCase()) {
                            for (var i in (null == e.settings &&
                                (e.settings = {}),
                            t))
                                if (Object.hasOwnProperty.call(t, i)) {
                                    var o = t[i]
                                    if (r.hasAttribute('data-' + i))
                                        try {
                                            var a = JSON.parse(
                                                r.getAttribute('data-' + i) ||
                                                    'true',
                                            )
                                            typeof a === o &&
                                                (e.settings[i] = a)
                                        } catch (e) {}
                                }
                            for (
                                var l = r.childNodes,
                                    s = '',
                                    c = '',
                                    u = !1,
                                    m = 0;
                                m < l.length;
                                ++m
                            ) {
                                var f = l[m]
                                f == e.element
                                    ? (u = !0)
                                    : '#text' === f.nodeName &&
                                      (u
                                          ? (c += f.nodeValue)
                                          : (s += f.nodeValue),
                                      r.removeChild(f),
                                      --m)
                            }
                            if (
                                e.element.children.length &&
                                Prism.plugins.KeepMarkup
                            ) {
                                var d = s + e.element.innerHTML + c
                                ;(e.element.innerHTML = n.normalize(
                                    d,
                                    e.settings,
                                )),
                                    (e.code = e.element.textContent)
                            } else
                                (e.code = s + e.code + c),
                                    (e.code = n.normalize(e.code, e.settings))
                        }
                    } else e.code = n.normalize(e.code, e.settings)
            })
    }
    function n(t) {
        this.defaults = e({}, t)
    }
    function r(e) {
        for (var t = 0, n = 0; n < e.length; ++n)
            e.charCodeAt(n) == '\t'.charCodeAt(0) && (t += 3)
        return e.length + t
    }
})()
!(function () {
    if ('undefined' != typeof Prism && 'undefined' != typeof document) {
        var e = [],
            t = {},
            n = function () {}
        Prism.plugins.toolbar = {}
        var a = (Prism.plugins.toolbar.registerButton = function (n, a) {
                var r
                ;(r =
                    'function' == typeof a
                        ? a
                        : function (e) {
                              var t
                              return (
                                  'function' == typeof a.onClick
                                      ? (((t =
                                            document.createElement(
                                                'button',
                                            )).type = 'button'),
                                        t.addEventListener(
                                            'click',
                                            function () {
                                                a.onClick.call(this, e)
                                            },
                                        ))
                                      : 'string' == typeof a.url
                                      ? ((t =
                                            document.createElement('a')).href =
                                            a.url)
                                      : (t = document.createElement('span')),
                                  a.className && t.classList.add(a.className),
                                  (t.textContent = a.text),
                                  t
                              )
                          }),
                    n in t
                        ? console.warn(
                              'There is a button with the key "' +
                                  n +
                                  '" registered already.',
                          )
                        : e.push((t[n] = r))
            }),
            r = (Prism.plugins.toolbar.hook = function (a) {
                var r = a.element.parentNode
                if (
                    r &&
                    /pre/i.test(r.nodeName) &&
                    !r.parentNode.classList.contains('code-toolbar')
                ) {
                    var o = document.createElement('div')
                    o.classList.add('code-toolbar'),
                        r.parentNode.insertBefore(o, r),
                        o.appendChild(r)
                    var i = document.createElement('div')
                    i.classList.add('toolbar')
                    var l = e,
                        d = (function (e) {
                            for (; e; ) {
                                var t = e.getAttribute('data-toolbar-order')
                                if (null != t)
                                    return (t = t.trim()).length
                                        ? t.split(/\s*,\s*/g)
                                        : []
                                e = e.parentElement
                            }
                        })(a.element)
                    d &&
                        (l = d.map(function (e) {
                            return t[e] || n
                        })),
                        l.forEach(function (e) {
                            var t = e(a)
                            if (t) {
                                var n = document.createElement('div')
                                n.classList.add('toolbar-item'),
                                    n.appendChild(t),
                                    i.appendChild(n)
                            }
                        }),
                        o.appendChild(i)
                }
            })
        a('label', function (e) {
            var t = e.element.parentNode
            if (t && /pre/i.test(t.nodeName) && t.hasAttribute('data-label')) {
                var n,
                    a,
                    r = t.getAttribute('data-label')
                try {
                    a = document.querySelector('template#' + r)
                } catch (e) {}
                return (
                    a
                        ? (n = a.content)
                        : (t.hasAttribute('data-url')
                              ? ((n = document.createElement('a')).href =
                                    t.getAttribute('data-url'))
                              : (n = document.createElement('span')),
                          (n.textContent = r)),
                    n
                )
            }
        }),
            Prism.hooks.add('complete', r)
    }
})()
'undefined' != typeof Prism &&
    'undefined' != typeof document &&
    document.querySelector &&
    Prism.plugins.toolbar.registerButton('download-file', function (t) {
        var e = t.element.parentNode
        if (
            e &&
            /pre/i.test(e.nodeName) &&
            e.hasAttribute('data-src') &&
            e.hasAttribute('data-download-link')
        ) {
            var n = e.getAttribute('data-src'),
                a = document.createElement('a')
            return (
                (a.textContent =
                    e.getAttribute('data-download-link-label') || 'Download'),
                a.setAttribute('download', ''),
                (a.href = n),
                a
            )
        }
    })
!(function () {
    if ('undefined' != typeof Prism && 'undefined' != typeof document) {
        var e = { '(': ')', '[': ']', '{': '}' },
            t = { '(': 'brace-round', '[': 'brace-square', '{': 'brace-curly' },
            n = { '${': '{' },
            r = 0,
            c = /^(pair-\d+-)(close|open)$/
        Prism.hooks.add('complete', function (c) {
            var i = c.element,
                d = i.parentElement
            if (d && 'PRE' == d.tagName) {
                var u = []
                if (
                    (Prism.util.isActive(i, 'match-braces') &&
                        u.push('(', '[', '{'),
                    0 != u.length)
                ) {
                    d.__listenerAdded ||
                        (d.addEventListener('mousedown', function () {
                            var e = d.querySelector('code'),
                                t = s('brace-selected')
                            Array.prototype.slice
                                .call(e.querySelectorAll('.' + t))
                                .forEach(function (e) {
                                    e.classList.remove(t)
                                })
                        }),
                        Object.defineProperty(d, '__listenerAdded', {
                            value: !0,
                        }))
                    var f = Array.prototype.slice.call(
                            i.querySelectorAll(
                                'span.' + s('token') + '.' + s('punctuation'),
                            ),
                        ),
                        h = []
                    u.forEach(function (c) {
                        for (
                            var i = e[c], d = s(t[c]), u = [], p = [], v = 0;
                            v < f.length;
                            v++
                        ) {
                            var m = f[v]
                            if (0 == m.childElementCount) {
                                var b = m.textContent
                                ;(b = n[b] || b) === c
                                    ? (h.push({
                                          index: v,
                                          open: !0,
                                          element: m,
                                      }),
                                      m.classList.add(d),
                                      m.classList.add(s('brace-open')),
                                      p.push(v))
                                    : b === i &&
                                      (h.push({
                                          index: v,
                                          open: !1,
                                          element: m,
                                      }),
                                      m.classList.add(d),
                                      m.classList.add(s('brace-close')),
                                      p.length && u.push([v, p.pop()]))
                            }
                        }
                        u.forEach(function (e) {
                            var t = 'pair-' + r++ + '-',
                                n = f[e[0]],
                                c = f[e[1]]
                            ;(n.id = t + 'open'),
                                (c.id = t + 'close'),
                                [n, c].forEach(function (e) {
                                    e.addEventListener('mouseenter', a),
                                        e.addEventListener('mouseleave', o),
                                        e.addEventListener('click', l)
                                })
                        })
                    })
                    var p = 0
                    h.sort(function (e, t) {
                        return e.index - t.index
                    }),
                        h.forEach(function (e) {
                            e.open
                                ? (e.element.classList.add(
                                      s('brace-level-' + ((p % 12) + 1)),
                                  ),
                                  p++)
                                : ((p = Math.max(0, p - 1)),
                                  e.element.classList.add(
                                      s('brace-level-' + ((p % 12) + 1)),
                                  ))
                        })
                }
            }
        })
    }
    function s(e) {
        var t = Prism.plugins.customClass
        return t ? t.apply(e, 'none') : e
    }
    function i(e) {
        var t = c.exec(e.id)
        return document.querySelector(
            '#' + t[1] + ('open' == t[2] ? 'close' : 'open'),
        )
    }
    function a() {
        Prism.util.isActive(this, 'brace-hover', !0) &&
            [this, i(this)].forEach(function (e) {
                e.classList.add(s('brace-hover'))
            })
    }
    function o() {
        ;[this, i(this)].forEach(function (e) {
            e.classList.remove(s('brace-hover'))
        })
    }
    function l() {
        Prism.util.isActive(this, 'brace-select', !0) &&
            [this, i(this)].forEach(function (e) {
                e.classList.add(s('brace-selected'))
            })
    }
})()
!(function () {
    if ('undefined' != typeof Prism) {
        var e = /^diff-([\w-]+)/i,
            i =
                /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
            a = RegExp(
                '(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))'.replace(
                    /__/g,
                    function () {
                        return i.source
                    },
                ),
                'gi',
            ),
            s = !1
        Prism.hooks.add('before-sanity-check', function (i) {
            var a = i.language
            e.test(a) &&
                !i.grammar &&
                (i.grammar = Prism.languages[a] = Prism.languages.diff)
        }),
            Prism.hooks.add('before-tokenize', function (i) {
                s ||
                    Prism.languages.diff ||
                    Prism.plugins.autoloader ||
                    ((s = !0),
                    console.warn(
                        "Prism's Diff Highlight plugin requires the Diff language definition (prism-diff.js).Make sure the language definition is loaded or use Prism's Autoloader plugin.",
                    ))
                var a = i.language
                e.test(a) &&
                    !Prism.languages[a] &&
                    (Prism.languages[a] = Prism.languages.diff)
            }),
            Prism.hooks.add('wrap', function (s) {
                var r, n
                if ('diff' !== s.language) {
                    var g = e.exec(s.language)
                    if (!g) return
                    ;(r = g[1]), (n = Prism.languages[r])
                }
                var f = Prism.languages.diff && Prism.languages.diff.PREFIXES
                if (f && s.type in f) {
                    var u,
                        l = s.content
                            .replace(i, '')
                            .replace(/&lt;/g, '<')
                            .replace(/&amp;/g, '&'),
                        t = l.replace(/(^|[\r\n])./g, '$1')
                    u = n ? Prism.highlight(t, n, r) : Prism.util.encode(t)
                    var o,
                        m = new Prism.Token('prefix', f[s.type], [
                            /\w+/.exec(s.type)[0],
                        ]),
                        d = Prism.Token.stringify(m, s.language),
                        c = []
                    for (a.lastIndex = 0; (o = a.exec(u)); ) c.push(d + o[0])
                    ;/(?:^|[\r\n]).$/.test(l) && c.push(d),
                        (s.content = c.join('')),
                        n && s.classes.push('language-' + r)
                }
            })
    }
})()

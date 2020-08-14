/**
 * isMobile.js v0.4.1
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 * É móvel

Uma biblioteca JS simples que detecta dispositivos móveis.

Por que usar isMobile?

Você provavelmente não deve usar esta biblioteca a menos que você absolutamente tem que. Na maioria dos casos, o bom design responsivo resolve o problema de controlar a forma de tornar as coisas em toda a diferentes tamanhos de tela. Mas há sempre casos de borda. Se você tiver um caso de borda, então esta biblioteca pode ser para você.

Eu tinha requisitos muito específicos para um projeto quando eu criei este:

- Redirect all iPhones, iPods, Android phones, and seven inch devices to the mobile site.

Sim, na época, um site completamente separado já havia sido criado para dispositivos móveis. Então eu não podia depender de consultas de mídia, detecção de recursos, degradação graciosa, aprimoramento progressivo, ou qualquer uma das técnicas legais para exibir seletivamente as coisas. Eu tive que encontrar uma maneira de redirecionar visitantes em determinados dispositivos para o site móvel.

Eu não poderia fazer a detecção do back-end, porque todo o site foi gerado como HTML, e em seguida cache e servido por um CDN , então eu tinha que fazer do lado do cliente a detecção.

Então eu recorreu a User-Agent (UA) sniffing.

Eu tentei manter o script pequeno ( atualmente ~ bytes 1.4k, minified ) e simples, uma vez que seria necessário para executar no <head>, que é geralmente uma má idéia, já que blocos JS a descarga e prestação de todos os ativos, enquanto ele analisa e executa . No caso do redirecionamento de dispositivos móveis, não me importo tanto, porque desejo iniciar o redirecionamento o mais rápido possível, antes que o dispositivo tenha a chance de iniciar o download e o processamento de outras coisas. Para plataformas não móveis, o script deve ser executado rapidamente, para que o navegador possa rapidamente voltar ao download e renderização.

Como funciona

O isMobile é executado rapidamente durante a carga inicial da página para detectar dispositivos móveis; Ele então cria um objeto JavaScript com os resultados.

Dispositivos detectados pelo isMobile

As seguintes propriedades do mundial isMobileobjecto será ou trueoufalse

Dispositivos Apple

isMobile.apple.phone
isMobile.apple.ipod
isMobile.apple.tablet
isMobile.apple.device (Qualquer dispositivo Apple móvel)

Dispositivos Android

isMobile.android.phone
isMobile.android.tablet
isMobile.android.device (Qualquer dispositivo móvel Android)

Dispositivos Amazon Silk (também passam nas verificações do Android)

isMobile.amazon.phone
isMobile.amazon.tablet
isMobile.amazon.device (Qualquer dispositivo móvel Silk da Amazon)

Dispositivos Windows

isMobile.windows.phone
isMobile.windows.tablet
isMobile.windows.device (Qualquer dispositivo móvel do Windows)
Dispositivos específicos de sete polegadas

isMobile.seven_inch

true Se o dispositivo é um dos seguintes 7 "dispositivos:
Nexus 7
acender fogueira
Nook Tablet 7 polegadas
Galaxy Tab 7 polegadas

"Outros dispositivos

isMobile.other.blackberry_10
isMobile.other.blackberry
isMobile.other.opera (Opera Mini)
isMobile.other.firefox
isMobile.other.chrome
isMobile.other.device (Qualquer outro dispositivo)

Agrupamentos Agrupados

isMobile.any - qualquer dispositivo combinado
isMobile.phone - qualquer dispositivo nos grupos de 'telefone' acima
isMobile.tablet - qualquer dispositivo nos grupos de 'tablets' acima 
 *
 *   
 */
(function (global) {

    var apple_phone         = /iPhone/i,
        apple_ipod          = /iPod/i,
        apple_tablet        = /iPad/i,
        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet      = /Android/i,
        amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone       = /Windows Phone/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7

            '|' +           // OR

            'BNTV250' +     // B&N Nook Tablet 7 inch

            '|' +           // OR

            'Kindle Fire' + // Kindle Fire

            '|' +           // OR

            'Silk' +        // Kindle Fire, Silk Accelerated

            '|' +           // OR

            'GT-P1000' +    // Galaxy Tab 7 inch

            ')',            // End non-capturing group

            'i');           // Case-insensitive matching

    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;

        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        // Twitter mobile app's integrated browser on iPad adds a "Twitter for
        // iPhone" string. Same probable happens on other tablet platforms.
        // This will confuse detection so strip it out if it exists.
        tmp = ua.split('Twitter');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone:  match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone:  match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone:  match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry:   match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera:        match(other_opera, ua),
            firefox:      match(other_firefox, ua),
            chrome:       match(other_chrome, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;

        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module !== 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module !== 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define('isMobile', [], global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);
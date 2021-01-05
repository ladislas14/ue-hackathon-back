"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARTNER_UNIVERSITIES = exports.CountryCode = void 0;
var CountryCode;
(function (CountryCode) {
    CountryCode["FRANCE"] = "FRA";
    CountryCode["SPAIN"] = "ES";
    CountryCode["POLAND"] = "POL";
    CountryCode["MALTA"] = "MLT";
    CountryCode["GERMANY"] = "DEU";
    CountryCode["CROATIA"] = "HRV";
})(CountryCode = exports.CountryCode || (exports.CountryCode = {}));
exports.PARTNER_UNIVERSITIES = [
    {
        key: 'univ-cadiz',
        domain: 'uca.es',
        country: CountryCode.SPAIN,
    },
    {
        key: 'univ-brest',
        domain: 'univ-brest.fr',
        country: CountryCode.FRANCE,
    },
    {
        key: 'univ-gdansk',
        domain: 'ug.edu.pl',
        country: CountryCode.POLAND,
    },
    {
        key: 'univ-malta',
        domain: 'um.edu.mt',
        country: CountryCode.MALTA,
    },
    {
        key: 'univ-kiel',
        domain: 'kms.uni-kiel.de',
        country: CountryCode.GERMANY,
    },
    {
        key: 'univ-split',
        domain: 'unist.hr',
        country: CountryCode.CROATIA,
    },
];
//# sourceMappingURL=sea.js.map
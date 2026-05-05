/**
 * ISO 3166-1 alpha-2 country codes with localized labels.
 * Used for country selects that need to output standard codes
 * (e.g. schema.org `addressCountry`, form submissions, analytics).
 *
 * Source: https://www.iso.org/obp/ui/#search
 * Updated: 2026-04
 */

export type CountryCode =
  | 'AF'
  | 'AL'
  | 'DZ'
  | 'AS'
  | 'AD'
  | 'AO'
  | 'AI'
  | 'AQ'
  | 'AG'
  | 'AR'
  | 'AM'
  | 'AW'
  | 'AU'
  | 'AT'
  | 'AZ'
  | 'BS'
  | 'BH'
  | 'BD'
  | 'BB'
  | 'BY'
  | 'BE'
  | 'BZ'
  | 'BJ'
  | 'BM'
  | 'BT'
  | 'BO'
  | 'BA'
  | 'BW'
  | 'BR'
  | 'IO'
  | 'VG'
  | 'BN'
  | 'BG'
  | 'BF'
  | 'BI'
  | 'KH'
  | 'CM'
  | 'CA'
  | 'CV'
  | 'KY'
  | 'CF'
  | 'TD'
  | 'CL'
  | 'CN'
  | 'CX'
  | 'CC'
  | 'CO'
  | 'KM'
  | 'CK'
  | 'CR'
  | 'HR'
  | 'CU'
  | 'CW'
  | 'CY'
  | 'CZ'
  | 'CD'
  | 'DK'
  | 'DJ'
  | 'DM'
  | 'DO'
  | 'EC'
  | 'EG'
  | 'SV'
  | 'GQ'
  | 'ER'
  | 'EE'
  | 'SZ'
  | 'ET'
  | 'FK'
  | 'FO'
  | 'FJ'
  | 'FI'
  | 'FR'
  | 'PF'
  | 'GA'
  | 'GM'
  | 'GE'
  | 'DE'
  | 'GH'
  | 'GI'
  | 'GR'
  | 'GL'
  | 'GD'
  | 'GU'
  | 'GT'
  | 'GG'
  | 'GN'
  | 'GW'
  | 'GY'
  | 'HT'
  | 'HN'
  | 'HK'
  | 'HU'
  | 'IS'
  | 'IN'
  | 'ID'
  | 'IR'
  | 'IQ'
  | 'IE'
  | 'IM'
  | 'IL'
  | 'IT'
  | 'CI'
  | 'JM'
  | 'JP'
  | 'JE'
  | 'JO'
  | 'KZ'
  | 'KE'
  | 'KI'
  | 'XK'
  | 'KW'
  | 'KG'
  | 'LA'
  | 'LV'
  | 'LB'
  | 'LS'
  | 'LR'
  | 'LY'
  | 'LI'
  | 'LT'
  | 'LU'
  | 'MO'
  | 'MG'
  | 'MW'
  | 'MY'
  | 'MV'
  | 'ML'
  | 'MT'
  | 'MH'
  | 'MR'
  | 'MU'
  | 'YT'
  | 'MX'
  | 'FM'
  | 'MD'
  | 'MC'
  | 'MN'
  | 'ME'
  | 'MS'
  | 'MA'
  | 'MZ'
  | 'MM'
  | 'NA'
  | 'NR'
  | 'NP'
  | 'NL'
  | 'NC'
  | 'NZ'
  | 'NI'
  | 'NE'
  | 'NG'
  | 'NU'
  | 'NF'
  | 'KP'
  | 'MK'
  | 'MP'
  | 'NO'
  | 'OM'
  | 'PK'
  | 'PW'
  | 'PS'
  | 'PA'
  | 'PG'
  | 'PY'
  | 'PE'
  | 'PH'
  | 'PN'
  | 'PL'
  | 'PT'
  | 'PR'
  | 'QA'
  | 'CG'
  | 'RO'
  | 'RU'
  | 'RW'
  | 'RE'
  | 'BL'
  | 'SH'
  | 'KN'
  | 'LC'
  | 'MF'
  | 'PM'
  | 'VC'
  | 'WS'
  | 'SM'
  | 'ST'
  | 'SA'
  | 'SN'
  | 'RS'
  | 'SC'
  | 'SL'
  | 'SG'
  | 'SX'
  | 'SK'
  | 'SI'
  | 'SB'
  | 'SO'
  | 'ZA'
  | 'KR'
  | 'SS'
  | 'ES'
  | 'LK'
  | 'SD'
  | 'SR'
  | 'SJ'
  | 'SE'
  | 'CH'
  | 'SY'
  | 'TW'
  | 'TJ'
  | 'TZ'
  | 'TH'
  | 'TL'
  | 'TG'
  | 'TK'
  | 'TO'
  | 'TT'
  | 'TN'
  | 'TR'
  | 'TM'
  | 'TC'
  | 'TV'
  | 'VI'
  | 'UG'
  | 'UA'
  | 'AE'
  | 'GB'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VU'
  | 'VA'
  | 'VE'
  | 'VN'
  | 'WF'
  | 'EH'
  | 'YE'
  | 'ZM'
  | 'ZW'
  | 'MQ'
  | 'GP'
  | 'GF'

export type CountryOption = {
  value: CountryCode
  label: { en: string; es: string }
}

export const COUNTRIES: CountryOption[] = [
  { value: 'AF', label: { en: 'Afghanistan', es: 'Afganistán' } },
  { value: 'AL', label: { en: 'Albania', es: 'Albania' } },
  { value: 'DE', label: { en: 'Germany', es: 'Alemania' } },
  { value: 'AD', label: { en: 'Andorra', es: 'Andorra' } },
  { value: 'AO', label: { en: 'Angola', es: 'Angola' } },
  { value: 'AI', label: { en: 'Anguilla', es: 'Anguila' } },
  { value: 'AQ', label: { en: 'Antarctica', es: 'Antártida' } },
  { value: 'AG', label: { en: 'Antigua and Barbuda', es: 'Antigua y Barbuda' } },
  { value: 'SA', label: { en: 'Saudi Arabia', es: 'Arabia Saudita' } },
  { value: 'DZ', label: { en: 'Algeria', es: 'Argelia' } },
  { value: 'AR', label: { en: 'Argentina', es: 'Argentina' } },
  { value: 'AM', label: { en: 'Armenia', es: 'Armenia' } },
  { value: 'AW', label: { en: 'Aruba', es: 'Aruba' } },
  { value: 'AU', label: { en: 'Australia', es: 'Australia' } },
  { value: 'AT', label: { en: 'Austria', es: 'Austria' } },
  { value: 'AZ', label: { en: 'Azerbaijan', es: 'Azerbaiyán' } },
  { value: 'BS', label: { en: 'Bahamas', es: 'Bahamas' } },
  { value: 'BD', label: { en: 'Bangladesh', es: 'Bangladés' } },
  { value: 'BB', label: { en: 'Barbados', es: 'Barbados' } },
  { value: 'BH', label: { en: 'Bahrain', es: 'Baréin' } },
  { value: 'BE', label: { en: 'Belgium', es: 'Bélgica' } },
  { value: 'BZ', label: { en: 'Belize', es: 'Belice' } },
  { value: 'BJ', label: { en: 'Benin', es: 'Benín' } },
  { value: 'BM', label: { en: 'Bermuda', es: 'Bermudas' } },
  { value: 'BY', label: { en: 'Belarus', es: 'Bielorrusia' } },
  { value: 'BO', label: { en: 'Bolivia', es: 'Bolivia' } },
  { value: 'BA', label: { en: 'Bosnia and Herzegovina', es: 'Bosnia y Herzegovina' } },
  { value: 'BW', label: { en: 'Botswana', es: 'Botsuana' } },
  { value: 'BR', label: { en: 'Brazil', es: 'Brasil' } },
  { value: 'BN', label: { en: 'Brunei', es: 'Brunéi' } },
  { value: 'BG', label: { en: 'Bulgaria', es: 'Bulgaria' } },
  { value: 'BF', label: { en: 'Burkina Faso', es: 'Burkina Faso' } },
  { value: 'BI', label: { en: 'Burundi', es: 'Burundi' } },
  { value: 'BT', label: { en: 'Bhutan', es: 'Bután' } },
  { value: 'CV', label: { en: 'Cape Verde', es: 'Cabo Verde' } },
  { value: 'KH', label: { en: 'Cambodia', es: 'Camboya' } },
  { value: 'CM', label: { en: 'Cameroon', es: 'Camerún' } },
  { value: 'CA', label: { en: 'Canada', es: 'Canadá' } },
  { value: 'QA', label: { en: 'Qatar', es: 'Catar' } },
  { value: 'TD', label: { en: 'Chad', es: 'Chad' } },
  { value: 'CL', label: { en: 'Chile', es: 'Chile' } },
  { value: 'CN', label: { en: 'China', es: 'China' } },
  { value: 'CY', label: { en: 'Cyprus', es: 'Chipre' } },
  { value: 'VA', label: { en: 'Vatican City', es: 'Ciudad del Vaticano' } },
  { value: 'CO', label: { en: 'Colombia', es: 'Colombia' } },
  { value: 'KM', label: { en: 'Comoros', es: 'Comoras' } },
  { value: 'KP', label: { en: 'North Korea', es: 'Corea del Norte' } },
  { value: 'KR', label: { en: 'South Korea', es: 'Corea del Sur' } },
  { value: 'CI', label: { en: "Côte d'Ivoire", es: 'Costa de Marfil' } },
  { value: 'CR', label: { en: 'Costa Rica', es: 'Costa Rica' } },
  { value: 'HR', label: { en: 'Croatia', es: 'Croacia' } },
  { value: 'CU', label: { en: 'Cuba', es: 'Cuba' } },
  { value: 'CW', label: { en: 'Curaçao', es: 'Curazao' } },
  { value: 'DK', label: { en: 'Denmark', es: 'Dinamarca' } },
  { value: 'DM', label: { en: 'Dominica', es: 'Dominica' } },
  { value: 'EC', label: { en: 'Ecuador', es: 'Ecuador' } },
  { value: 'EG', label: { en: 'Egypt', es: 'Egipto' } },
  { value: 'SV', label: { en: 'El Salvador', es: 'El Salvador' } },
  { value: 'AE', label: { en: 'United Arab Emirates', es: 'Emiratos Árabes Unidos' } },
  { value: 'ER', label: { en: 'Eritrea', es: 'Eritrea' } },
  { value: 'SK', label: { en: 'Slovakia', es: 'Eslovaquia' } },
  { value: 'SI', label: { en: 'Slovenia', es: 'Eslovenia' } },
  { value: 'ES', label: { en: 'Spain', es: 'España' } },
  { value: 'US', label: { en: 'United States', es: 'Estados Unidos' } },
  { value: 'EE', label: { en: 'Estonia', es: 'Estonia' } },
  { value: 'ET', label: { en: 'Ethiopia', es: 'Etiopía' } },
  { value: 'PH', label: { en: 'Philippines', es: 'Filipinas' } },
  { value: 'FI', label: { en: 'Finland', es: 'Finlandia' } },
  { value: 'FJ', label: { en: 'Fiji', es: 'Fiyi' } },
  { value: 'FR', label: { en: 'France', es: 'Francia' } },
  { value: 'GA', label: { en: 'Gabon', es: 'Gabón' } },
  { value: 'GM', label: { en: 'Gambia', es: 'Gambia' } },
  { value: 'GE', label: { en: 'Georgia', es: 'Georgia' } },
  { value: 'GH', label: { en: 'Ghana', es: 'Ghana' } },
  { value: 'GI', label: { en: 'Gibraltar', es: 'Gibraltar' } },
  { value: 'GD', label: { en: 'Grenada', es: 'Granada' } },
  { value: 'GR', label: { en: 'Greece', es: 'Grecia' } },
  { value: 'GL', label: { en: 'Greenland', es: 'Groenlandia' } },
  { value: 'GP', label: { en: 'Guadeloupe', es: 'Guadalupe' } },
  { value: 'GU', label: { en: 'Guam', es: 'Guam' } },
  { value: 'GT', label: { en: 'Guatemala', es: 'Guatemala' } },
  { value: 'GF', label: { en: 'French Guiana', es: 'Guayana Francesa' } },
  { value: 'GG', label: { en: 'Guernsey', es: 'Guernsey' } },
  { value: 'GN', label: { en: 'Guinea', es: 'Guinea' } },
  { value: 'GQ', label: { en: 'Equatorial Guinea', es: 'Guinea Ecuatorial' } },
  { value: 'GW', label: { en: 'Guinea-Bissau', es: 'Guinea-Bisáu' } },
  { value: 'GY', label: { en: 'Guyana', es: 'Guyana' } },
  { value: 'HT', label: { en: 'Haiti', es: 'Haití' } },
  { value: 'HN', label: { en: 'Honduras', es: 'Honduras' } },
  { value: 'HK', label: { en: 'Hong Kong', es: 'Hong Kong' } },
  { value: 'HU', label: { en: 'Hungary', es: 'Hungría' } },
  { value: 'IN', label: { en: 'India', es: 'India' } },
  { value: 'ID', label: { en: 'Indonesia', es: 'Indonesia' } },
  { value: 'IQ', label: { en: 'Iraq', es: 'Irak' } },
  { value: 'IR', label: { en: 'Iran', es: 'Irán' } },
  { value: 'IE', label: { en: 'Ireland', es: 'Irlanda' } },
  { value: 'IS', label: { en: 'Iceland', es: 'Islandia' } },
  { value: 'KY', label: { en: 'Cayman Islands', es: 'Islas Caimán' } },
  { value: 'CK', label: { en: 'Cook Islands', es: 'Islas Cook' } },
  { value: 'FO', label: { en: 'Faroe Islands', es: 'Islas Feroe' } },
  { value: 'FK', label: { en: 'Falkland Islands', es: 'Islas Malvinas' } },
  { value: 'MP', label: { en: 'Northern Mariana Islands', es: 'Islas Marianas del Norte' } },
  { value: 'MH', label: { en: 'Marshall Islands', es: 'Islas Marshall' } },
  { value: 'SB', label: { en: 'Solomon Islands', es: 'Islas Salomón' } },
  { value: 'TC', label: { en: 'Turks and Caicos Islands', es: 'Islas Turcas y Caicos' } },
  { value: 'VG', label: { en: 'British Virgin Islands', es: 'Islas Vírgenes Británicas' } },
  { value: 'VI', label: { en: 'U.S. Virgin Islands', es: 'Islas Vírgenes de EE. UU.' } },
  { value: 'IL', label: { en: 'Israel', es: 'Israel' } },
  { value: 'IT', label: { en: 'Italy', es: 'Italia' } },
  { value: 'JM', label: { en: 'Jamaica', es: 'Jamaica' } },
  { value: 'JP', label: { en: 'Japan', es: 'Japón' } },
  { value: 'JE', label: { en: 'Jersey', es: 'Jersey' } },
  { value: 'JO', label: { en: 'Jordan', es: 'Jordania' } },
  { value: 'KZ', label: { en: 'Kazakhstan', es: 'Kazajistán' } },
  { value: 'KE', label: { en: 'Kenya', es: 'Kenia' } },
  { value: 'KG', label: { en: 'Kyrgyzstan', es: 'Kirguistán' } },
  { value: 'KI', label: { en: 'Kiribati', es: 'Kiribati' } },
  { value: 'XK', label: { en: 'Kosovo', es: 'Kosovo' } },
  { value: 'KW', label: { en: 'Kuwait', es: 'Kuwait' } },
  { value: 'LA', label: { en: 'Laos', es: 'Laos' } },
  { value: 'LS', label: { en: 'Lesotho', es: 'Lesoto' } },
  { value: 'LV', label: { en: 'Latvia', es: 'Letonia' } },
  { value: 'LB', label: { en: 'Lebanon', es: 'Líbano' } },
  { value: 'LR', label: { en: 'Liberia', es: 'Liberia' } },
  { value: 'LY', label: { en: 'Libya', es: 'Libia' } },
  { value: 'LI', label: { en: 'Liechtenstein', es: 'Liechtenstein' } },
  { value: 'LT', label: { en: 'Lithuania', es: 'Lituania' } },
  { value: 'LU', label: { en: 'Luxembourg', es: 'Luxemburgo' } },
  { value: 'MX', label: { en: 'Mexico', es: 'México' } },
  { value: 'MC', label: { en: 'Monaco', es: 'Mónaco' } },
  { value: 'MO', label: { en: 'Macao', es: 'Macao' } },
  { value: 'MK', label: { en: 'North Macedonia', es: 'Macedonia del Norte' } },
  { value: 'MG', label: { en: 'Madagascar', es: 'Madagascar' } },
  { value: 'MY', label: { en: 'Malaysia', es: 'Malasia' } },
  { value: 'MW', label: { en: 'Malawi', es: 'Malaui' } },
  { value: 'MV', label: { en: 'Maldives', es: 'Maldivas' } },
  { value: 'ML', label: { en: 'Mali', es: 'Malí' } },
  { value: 'MT', label: { en: 'Malta', es: 'Malta' } },
  { value: 'MA', label: { en: 'Morocco', es: 'Marruecos' } },
  { value: 'MQ', label: { en: 'Martinique', es: 'Martinica' } },
  { value: 'MU', label: { en: 'Mauritius', es: 'Mauricio' } },
  { value: 'MR', label: { en: 'Mauritania', es: 'Mauritania' } },
  { value: 'YT', label: { en: 'Mayotte', es: 'Mayotte' } },
  { value: 'FM', label: { en: 'Micronesia', es: 'Micronesia' } },
  { value: 'MD', label: { en: 'Moldova', es: 'Moldavia' } },
  { value: 'MN', label: { en: 'Mongolia', es: 'Mongolia' } },
  { value: 'ME', label: { en: 'Montenegro', es: 'Montenegro' } },
  { value: 'MS', label: { en: 'Montserrat', es: 'Montserrat' } },
  { value: 'MZ', label: { en: 'Mozambique', es: 'Mozambique' } },
  { value: 'MM', label: { en: 'Myanmar', es: 'Myanmar' } },
  { value: 'NA', label: { en: 'Namibia', es: 'Namibia' } },
  { value: 'NR', label: { en: 'Nauru', es: 'Nauru' } },
  { value: 'NP', label: { en: 'Nepal', es: 'Nepal' } },
  { value: 'NI', label: { en: 'Nicaragua', es: 'Nicaragua' } },
  { value: 'NE', label: { en: 'Niger', es: 'Níger' } },
  { value: 'NG', label: { en: 'Nigeria', es: 'Nigeria' } },
  { value: 'NU', label: { en: 'Niue', es: 'Niue' } },
  { value: 'NF', label: { en: 'Norfolk Island', es: 'Isla Norfolk' } },
  { value: 'NO', label: { en: 'Norway', es: 'Noruega' } },
  { value: 'NC', label: { en: 'New Caledonia', es: 'Nueva Caledonia' } },
  { value: 'NZ', label: { en: 'New Zealand', es: 'Nueva Zelanda' } },
  { value: 'OM', label: { en: 'Oman', es: 'Omán' } },
  { value: 'NL', label: { en: 'Netherlands', es: 'Países Bajos' } },
  { value: 'PK', label: { en: 'Pakistan', es: 'Pakistán' } },
  { value: 'PW', label: { en: 'Palau', es: 'Palaos' } },
  { value: 'PS', label: { en: 'Palestine', es: 'Palestina' } },
  { value: 'PA', label: { en: 'Panama', es: 'Panamá' } },
  { value: 'PG', label: { en: 'Papua New Guinea', es: 'Papúa Nueva Guinea' } },
  { value: 'PY', label: { en: 'Paraguay', es: 'Paraguay' } },
  { value: 'PE', label: { en: 'Peru', es: 'Perú' } },
  { value: 'PF', label: { en: 'French Polynesia', es: 'Polinesia Francesa' } },
  { value: 'PL', label: { en: 'Poland', es: 'Polonia' } },
  { value: 'PT', label: { en: 'Portugal', es: 'Portugal' } },
  { value: 'PR', label: { en: 'Puerto Rico', es: 'Puerto Rico' } },
  { value: 'GB', label: { en: 'United Kingdom', es: 'Reino Unido' } },
  { value: 'CF', label: { en: 'Central African Republic', es: 'República Centroafricana' } },
  { value: 'CZ', label: { en: 'Czechia', es: 'República Checa' } },
  { value: 'CG', label: { en: 'Congo', es: 'República del Congo' } },
  { value: 'CD', label: { en: 'DR Congo', es: 'República Democrática del Congo' } },
  { value: 'DO', label: { en: 'Dominican Republic', es: 'República Dominicana' } },
  { value: 'RE', label: { en: 'Réunion', es: 'Reunión' } },
  { value: 'RW', label: { en: 'Rwanda', es: 'Ruanda' } },
  { value: 'RO', label: { en: 'Romania', es: 'Rumania' } },
  { value: 'RU', label: { en: 'Russia', es: 'Rusia' } },
  { value: 'EH', label: { en: 'Western Sahara', es: 'Sahara Occidental' } },
  { value: 'WS', label: { en: 'Samoa', es: 'Samoa' } },
  { value: 'AS', label: { en: 'American Samoa', es: 'Samoa Americana' } },
  { value: 'BL', label: { en: 'Saint Barthélemy', es: 'San Bartolomé' } },
  { value: 'KN', label: { en: 'Saint Kitts and Nevis', es: 'San Cristóbal y Nieves' } },
  { value: 'SM', label: { en: 'San Marino', es: 'San Marino' } },
  { value: 'MF', label: { en: 'Saint Martin', es: 'San Martín' } },
  { value: 'PM', label: { en: 'Saint Pierre and Miquelon', es: 'San Pedro y Miquelón' } },
  {
    value: 'VC',
    label: { en: 'Saint Vincent and the Grenadines', es: 'San Vicente y las Granadinas' },
  },
  { value: 'SH', label: { en: 'Saint Helena', es: 'Santa Elena' } },
  { value: 'LC', label: { en: 'Saint Lucia', es: 'Santa Lucía' } },
  { value: 'ST', label: { en: 'São Tomé and Príncipe', es: 'Santo Tomé y Príncipe' } },
  { value: 'SN', label: { en: 'Senegal', es: 'Senegal' } },
  { value: 'RS', label: { en: 'Serbia', es: 'Serbia' } },
  { value: 'SC', label: { en: 'Seychelles', es: 'Seychelles' } },
  { value: 'SL', label: { en: 'Sierra Leone', es: 'Sierra Leona' } },
  { value: 'SG', label: { en: 'Singapore', es: 'Singapur' } },
  { value: 'SX', label: { en: 'Sint Maarten', es: 'Sint Maarten' } },
  { value: 'SY', label: { en: 'Syria', es: 'Siria' } },
  { value: 'SO', label: { en: 'Somalia', es: 'Somalia' } },
  { value: 'LK', label: { en: 'Sri Lanka', es: 'Sri Lanka' } },
  { value: 'ZA', label: { en: 'South Africa', es: 'Sudáfrica' } },
  { value: 'SD', label: { en: 'Sudan', es: 'Sudán' } },
  { value: 'SS', label: { en: 'South Sudan', es: 'Sudán del Sur' } },
  { value: 'SE', label: { en: 'Sweden', es: 'Suecia' } },
  { value: 'CH', label: { en: 'Switzerland', es: 'Suiza' } },
  { value: 'SR', label: { en: 'Suriname', es: 'Surinam' } },
  { value: 'SJ', label: { en: 'Svalbard and Jan Mayen', es: 'Svalbard y Jan Mayen' } },
  { value: 'SZ', label: { en: 'Eswatini', es: 'Suazilandia' } },
  { value: 'TH', label: { en: 'Thailand', es: 'Tailandia' } },
  { value: 'TW', label: { en: 'Taiwan', es: 'Taiwán' } },
  { value: 'TZ', label: { en: 'Tanzania', es: 'Tanzania' } },
  { value: 'TJ', label: { en: 'Tajikistan', es: 'Tayikistán' } },
  { value: 'TL', label: { en: 'Timor-Leste', es: 'Timor Oriental' } },
  { value: 'TG', label: { en: 'Togo', es: 'Togo' } },
  { value: 'TK', label: { en: 'Tokelau', es: 'Tokelau' } },
  { value: 'TO', label: { en: 'Tonga', es: 'Tonga' } },
  { value: 'TT', label: { en: 'Trinidad and Tobago', es: 'Trinidad y Tobago' } },
  { value: 'TN', label: { en: 'Tunisia', es: 'Túnez' } },
  { value: 'TM', label: { en: 'Turkmenistan', es: 'Turkmenistán' } },
  { value: 'TR', label: { en: 'Türkiye', es: 'Turquía' } },
  { value: 'TV', label: { en: 'Tuvalu', es: 'Tuvalu' } },
  { value: 'UA', label: { en: 'Ukraine', es: 'Ucrania' } },
  { value: 'UG', label: { en: 'Uganda', es: 'Uganda' } },
  { value: 'UY', label: { en: 'Uruguay', es: 'Uruguay' } },
  { value: 'UZ', label: { en: 'Uzbekistan', es: 'Uzbekistán' } },
  { value: 'VU', label: { en: 'Vanuatu', es: 'Vanuatu' } },
  { value: 'VE', label: { en: 'Venezuela', es: 'Venezuela' } },
  { value: 'VN', label: { en: 'Vietnam', es: 'Vietnam' } },
  { value: 'WF', label: { en: 'Wallis and Futuna', es: 'Wallis y Futuna' } },
  { value: 'YE', label: { en: 'Yemen', es: 'Yemen' } },
  { value: 'DJ', label: { en: 'Djibouti', es: 'Yibuti' } },
  { value: 'ZM', label: { en: 'Zambia', es: 'Zambia' } },
  { value: 'ZW', label: { en: 'Zimbabwe', es: 'Zimbabue' } },
]

// Sort alphabetically by Spanish label (adjust to 'en' if preferred)
COUNTRIES.sort((a, b) => a.label.es.localeCompare(b.label.es, 'es'))

/**
 * Payload-ready options (already sorted).
 */
export const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({
  label: c.label,
  value: c.value,
}))

/**
 * Lookup helper: get a country label by code and locale.
 */
export function getCountryLabel(code: CountryCode, locale: 'en' | 'es' = 'es'): string {
  const country = COUNTRIES.find((c) => c.value === code)
  return country?.label[locale] ?? code
}

import { AssamDistrictInfo, AssamRegion } from '../types';

export const ASSAM_COLLEGES: string[] = [
  'Cotton University, Guwahati',
  'Gauhati University, Jalukbari',
  'Dibrugarh University, Dibrugarh',
  'IIT Guwahati (Indian Institute of Technology)',
  'NIT Silchar (National Institute of Technology)',
  'Tezpur University, Tezpur',
  'Assam University, Silchar',
  'Assam Engineering College (AEC), Jalukbari',
  'Jorhat Engineering College (JEC), Jorhat',
  'Handique Girls\' College, Guwahati',
  'B. Borooah College, Ulubari, Guwahati',
  'Cotton College (State University), Guwahati',
  'Dispur College, Dispur, Guwahati',
  'Assam Don Bosco University, Tapesia',
  'Royal Global University (RGU), Betkuchi',
  'Kaziranga University, Jorhat',
  'Jorhat Institute of Science & Technology (JIST)',
  'Arya Vidyapeeth College, Guwahati',
  'Pragjyotish College, Santipur, Guwahati',
  'Pandu College, Guwahati',
  'Nowgong College, Nagaon',
  'D.H.S.K. College, Dibrugarh',
  'J.B. College (Jagannath Barooah), Jorhat',
  'Darrang College, Tezpur',
  'Gurucharan College (GC College), Silchar',
  'Karimganj College, Karimganj',
  'North Lakhimpur university,North Lakhimpur',
  'Lakhimpur Commerce College, North Lakhimpur',
  'Majuli College, Majuli',
  'Majuli Cultural University',
  'Sibsagar College, Joysagar, Sivasagar',
  'Kokrajhar Government College, Kokrajhar',
  'Diphu Government College, Karbi Anglong',
  'Golaghat Commerce College, Golaghat',
  'Bilasipara College, Dhubri',
  'Bongaigaon College, Bongaigaon',
  'Nalbari College, Nalbari',
  'Barpeta Road Kalgachia College, Barpeta',
  'Tinsukia College, Tinsukia'
];

export const ASSAM_DISTRICTS: AssamDistrictInfo[] = [
  // Upper Assam
  { name: 'Dibrugarh', region: 'Upper Assam', hq: 'Dibrugarh', shortCode: 'DBR' },
  { name: 'Tinsukia', region: 'Upper Assam', hq: 'Tinsukia', shortCode: 'TSK' },
  { name: 'Sivasagar', region: 'Upper Assam', hq: 'Sivasagar', shortCode: 'SVS' },
  { name: 'Charaideo', region: 'Upper Assam', hq: 'Sonari', shortCode: 'CRD' },
  { name: 'Jorhat', region: 'Upper Assam', hq: 'Jorhat', shortCode: 'JRH' },
  { name: 'Majuli', region: 'Upper Assam', hq: 'Garamur', shortCode: 'MJL' },
  { name: 'Golaghat', region: 'Upper Assam', hq: 'Golaghat', shortCode: 'GLT' },
  { name: 'Lakhimpur', region: 'Upper Assam', hq: 'North Lakhimpur', shortCode: 'LKP' },
  { name: 'Dhemaji', region: 'Upper Assam', hq: 'Dhemaji', shortCode: 'DMJ' },

  // Central Assam
  { name: 'Kamrup Metropolitan (Guwahati)', region: 'Central Assam', hq: 'Guwahati', shortCode: 'GHY' },
  { name: 'Kamrup Rural', region: 'Central Assam', hq: 'Amingaon', shortCode: 'KMP' },
  { name: 'Nagaon', region: 'Central Assam', hq: 'Nagaon', shortCode: 'NGN' },
  { name: 'Morigaon', region: 'Central Assam', hq: 'Morigaon', shortCode: 'MRG' },
  { name: 'Sonitpur (Tezpur)', region: 'Central Assam', hq: 'Tezpur', shortCode: 'SON' },
  { name: 'Biswanath', region: 'Central Assam', hq: 'Biswanath Chariali', shortCode: 'BSW' },
  { name: 'Hojai', region: 'Central Assam', hq: 'Sankardev Nagar', shortCode: 'HOJ' },

  // Lower Assam
  { name: 'Nalbari', region: 'Lower Assam', hq: 'Nalbari', shortCode: 'NLB' },
  { name: 'Barpeta', region: 'Lower Assam', hq: 'Barpeta', shortCode: 'BRP' },
  { name: 'Bajali', region: 'Lower Assam', hq: 'Pathsala', shortCode: 'BJL' },
  { name: 'Bongaigaon', region: 'Lower Assam', hq: 'Bongaigaon', shortCode: 'BNG' },
  { name: 'Goalpara', region: 'Lower Assam', hq: 'Goalpara', shortCode: 'GLP' },
  { name: 'Dhubri', region: 'Lower Assam', hq: 'Dhubri', shortCode: 'DHB' },
  { name: 'South Salmara-Mankachar', region: 'Lower Assam', hq: 'Hatsingimari', shortCode: 'SSM' },
  { name: 'Baksa (BTR)', region: 'Lower Assam', hq: 'Musalpur', shortCode: 'BKS' },
  { name: 'Chirang (BTR)', region: 'Lower Assam', hq: 'Kajalgaon', shortCode: 'CRG' },
  { name: 'Kokrajhar (BTR)', region: 'Lower Assam', hq: 'Kokrajhar', shortCode: 'KKR' },
  { name: 'Tamulpur', region: 'Lower Assam', hq: 'Tamulpur', shortCode: 'TMP' },
  { name: 'Udalguri (BTR)', region: 'Lower Assam', hq: 'Udalguri', shortCode: 'UDL' },
  { name: 'Darrang (Mangaldai)', region: 'Lower Assam', hq: 'Mangaldai', shortCode: 'DRG' },

  // Barak Valley
  { name: 'Cachar (Silchar)', region: 'Barak Valley', hq: 'Silchar', shortCode: 'CCH' },
  { name: 'Karimganj (Sribhumi)', region: 'Barak Valley', hq: 'Karimganj', shortCode: 'KMJ' },
  { name: 'Hailakandi', region: 'Barak Valley', hq: 'Hailakandi', shortCode: 'HLK' },

  // Hill Districts
  { name: 'Karbi Anglong', region: 'Hill Districts', hq: 'Diphu', shortCode: 'KRA' },
  { name: 'West Karbi Anglong', region: 'Hill Districts', hq: 'Hamren', shortCode: 'WKA' },
  { name: 'Dima Hasao (Haflong)', region: 'Hill Districts', hq: 'Haflong', shortCode: 'DMH' }
];

export const REGIONS_LIST: AssamRegion[] = [
  'Upper Assam',
  'Central Assam',
  'Lower Assam',
  'Barak Valley',
  'Hill Districts'
];

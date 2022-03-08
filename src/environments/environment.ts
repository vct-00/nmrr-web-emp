export const businessDomain = `localhost:3000`;

export const environment = {
  production: false,
  base_url: 'https://api.cognity.io/v2',
  xApiKey: '33f478c0-a49a-11ea-b814-81438942a676',
  gmapApiKey: 'AIzaSyDAzzlrK6s9Mo3vfnltj_8pen3xYbJUc9k',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQxODA0MDA1LCJleHAiOjE2NDQzOTYwMDV9.3YCfjuyLxIR5ljCI9rKZczp1wdePKLycWV_b0MrEb0k',
  privacyPolicyUrl: 'http://localhost:4201',

  getBusiness() {
    return `http://${businessDomain}`;
  },
};

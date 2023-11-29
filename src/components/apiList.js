export const server = process.env.SERVER_URL || "https://converselybackend-production.up.railway.app";
//export const server = process.env.SERVER_URL || "http://127.0.0.1:8000";
//https://hr-production-d58f.up.railway.app
//http://82.55.115.103:8001
//http://127.0.0.1:8000
//http://79.13.113.69:8000

///api/* http://79.13.113.69:8000/:splat  200

const apiList = {
  login: `${server}/auth/login/`,
  signup: `${server}/auth/register/`,
  logout: `${server}/auth/logout/`,
  getJobs: `${server}/offer/getAgencyOffers/`,
  searchJob: `${server}/offer/searchOffers/`,
  getOfferApplications: `${server}/offer/getOfferApplications/`,
  getAllWorkers: `${server}/stats/getWorkers/`,
  jobs: `${server}/offer/createOffer/`,
  applicationsCandidate: `${server}/offer/applicate/`,
  applicationsSave: `${server}/offer/saveOffer/`,
  getSavedJob: `${server}/offer/getSavedOffers/`,
  getWorker: `${server}/stats/getWorker/`,
  getInterview: `${server}/profile_managment/getInterviews/`,
  setWorkerStatus: `${server}/profile_managment/setWorkerStatus/`,
  setInterviewDate: `${server}/profile_managment/setInterviewDate/`,
  getAgency: `${server}/stats/getAgency/`,
  uploadResume: `${server}/upload/resume/`,
  uploadProfileImage: `${server}/upload/profile/`,
  addExLink: `${server}/stats/setStats/`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  subscribe: `${server}/payments/subscribePremium/`,
  cancelSubscribe: `${server}/payments/cancelPremium/`,
  deleteAnnuncio: `${server}/offer/deleteOffer/`,
};

export default apiList;
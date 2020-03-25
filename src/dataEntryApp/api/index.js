import httpClient from "common/utils/httpClient";

export default {
  fetchOperationalModules: () =>
    httpClient.fetchJson("/web/operationalModules/").then(response => response.json),
  fetchForm: uuid => httpClient.fetchJson(`/web/form/${uuid}`).then(response => response.json),
  fetchEnrolForm: uuid =>
    httpClient
      .fetchJson(`web/form/23d8763d-4759-4c7d-bb46-d57a1ee58673`)
      .then(response => response.json),
  fetchGenders: () => httpClient.fetchJson("/web/gender/").then(response => response.json),
  saveSubject: subject =>
    httpClient.fetchJson("/individuals", {
      method: "POST",
      body: JSON.stringify(subject)
    }),

  fetchSubjectProfile: uuid =>
    httpClient.fetchJson(`/web/subjectProfile?uuid=${uuid}`).then(response => {
      return response.json;
    }),

  fetchPrograms: () =>
    httpClient.fetchJson(`/web/programs`).then(response => {
      return response.json;
    }),

  fetchSubjectProgram: uuid => {
    return httpClient.fetchJson(`/web/subject/${uuid}/programs/`).then(response => response.json);
  },
  fetchSubjectGeneral: uuid => {
    return httpClient.fetchJson(`/web/subject/${uuid}/encounters/`).then(response => response.json);
  },
  fetchEnrolments: uuid => {
    return httpClient.fetchJson(`/api/enrolments/`).then(response => response.json);
  }
};

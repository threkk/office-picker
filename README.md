# Office Picker

> Online demo: [https://office-picker.threkk.com](https://office-picker.threkk.com)

## About the project
> Jamie's vacation is about to end. She works at an international company, so she can choose another office to work from: either Amsterdam, Madrid, or Budapest. Help her choose which office to go to – she’d like someplace with good weather or cheap flights (or both).

I decided to build a card-based frontend with some basic information about every
office. I used Adyen offices as input, gathered from the official webpage. Each
card represents one office, and when you open each card, you can read some basic
information about the city, its weather and the location of the office on the
map. I was planning also to add an integration with a flight search API, but I
ran out of time for it.

The frontend is a Vue single page application, as requested in the spec. The
backend is a set of lambda functions that interface with the API to proxy the
services for security and control. The project makes use of the following APIs:
OpenWeather, Geoapify and Wikipedia.

### Focus areas
- **Learning process**: My main expertise is using React, and my experience with
    Vue dates from the object-based components. I decided to showcase my ability
    to pick up new technologies, or in this case, update them. I went with a
    TypeScript class-based Vue as a framework choice.
- **SPA best practices**: I focused on getting a high [Lighthouse](https://developers.google.com/web/tools/lighthouse/) score. The production version that can be tested above scores hight on Lighthouse in both mobile and desktop. The design has been focused on being responsive to different resolutions.
- **API integrations**: The project integrates three different API's using Vuex
    and a lambda based backend-for-fronted. At the same time,

### Pending work
- **More testing**: The Vuex stores have been heavily tested, but due to time
    constraints, the components and lambdas could not be tested.
- **Caching**: I could have done a much better job in caching the API results
    both in backend and frontend, starting with things like eTag support in the
    functions, storing the results in an external service or at least in memory
    and checking the values in the state before calling the actions.
- **CI/CD pipeline**: Although it is "trivial", I didn't have time to create a
    CI/CD pipeline to automatically deploy the project on Github. However, the
    deployment using `vercel` builds the project and runs the tests.

## Project setup

This project relies on `vue` for the frontend and `vercel` for the backend and
deployments.
```
npm install -g @vue/cli @vue/cli-service-global vercel
npm install
```

You will also need two API keys, one for [OpenWeather](https://openweathermap.org/) and another for [Geoapify](https://www.geoapify.com/).
```
export WEATHER_API_KEY="<your OpenWeather key here>"
export GEO_API_KEY="<You Geoapify key here>"
```

### Compiles and hot-reloads for development
```
vercel dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Deploy
```
vercel
```

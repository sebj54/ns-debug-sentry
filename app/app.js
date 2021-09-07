import Vue from 'nativescript-vue'
import { isAndroid } from '@nativescript/core'
import * as Sentry from '@nativescript-community/sentry'
import { getBuildNumber, getVersionName } from 'nativescript-extendedinfo';

import Home from './components/Home'

const SENTRY_DSN = 'https://62e49d5d671847fd9cae08e00fd9e91d@o124048.ingest.sentry.io/5948658'

Promise.all([getVersionName(), getBuildNumber()])
    .then(([versionName, buildNumber]) => {
        Sentry.init({
            dsn: SENTRY_DSN,
            // debug: true,
            appPrefix: 'app:///',
            release: versionName,
            dist: `${buildNumber}.${isAndroid ? 'android' : 'ios'}`,
        })
    })
    .catch((error) => {
        if (error && error.stack) {
            console.error(error.stack)
        } else {
            console.error(error)
        }
    })

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()

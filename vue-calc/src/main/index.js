'use strict'

import { app, BrowserWindow } from 'electron'
// const path = require('path')

const Impostazioni = require('electron-store')
const impostazioni = new Impostazioni({
  defaults: {
    windowBounds: { width: 340, height: 550 },
    settings: { temaDark: true, formatNumber: 'zzz', decimalPlaces: 5, linguaApp: 'zzz' },
    sistema: { lang: 'zzz' }
  }
})

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  let { width, height } = impostazioni.get('windowBounds')

  mainWindow = new BrowserWindow({
    height: height,
    width: width,
    minHeight: 550,
    // useContentSize: true,
    minWidth: 340,
    // icon: path.join(__static, '64x64.png'),
    frame: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('resize', () => {
    let { width, height } = mainWindow.getBounds()
    impostazioni.set('windowBounds', { width, height })
  })
}

app.on('ready', () => {
  const langLocale = app.getLocale()
  const linguaAppLocale = langLocale === 'it' | langLocale === 'it-IT' | langLocale === 'it-CH' ? 'Italiano' : 'English'
  if (impostazioni.get('settings.formatNumber') === 'zzz') { impostazioni.set('settings.formatNumber', langLocale) }
  if (impostazioni.get('settings.linguaApp') === 'zzz') { impostazioni.set('settings.linguaApp', linguaAppLocale) }
  if (impostazioni.get('sistema.lang') === 'zzz') { impostazioni.set('sistema.lang', langLocale) }

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

// import { autoUpdater } from 'electron-updater'

// autoUpdater.on('update-downloaded', () => {
//   autoUpdater.quitAndInstall()
// })
//
// app.on('ready', () => {
//   if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
// })

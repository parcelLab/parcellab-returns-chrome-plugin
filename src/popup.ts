// Import our custom CSS
import '../styles/common.scss'

import {
	getOptionsMA,
	StorageOptionsMA,
	getLastResult,
	getCurrentAccount,
	setCurrentAccount,
} from './storage'
import * as UX from './ux'

import { Offcanvas } from 'bootstrap'

require('bootstrap-icons/font/bootstrap-icons.css')

//const options: StorageOptions = getOptions()
const options: StorageOptionsMA = getOptionsMA()
const account = {
	user: null,
	lang: null,
	country: null
}





$(document).ready(function () {
	const lastResult = getLastResult()
	const currentAccount = getCurrentAccount()

	UX.readyPanel(options, lastResult, currentAccount)

	$('#account-selector').on( "change", function() {
		const newCurrentAccount = $(this).children('option:selected').val()
		setCurrentAccount(newCurrentAccount)
	})

	$('#start-return-btn').on('click', function () {
		account.user = $('select option:selected').attr('data-pl-account-user')
		account.lang = $('select option:selected').attr('data-pl-account-lang')
		account.country = $('select option:selected').attr('data-pl-account-country')

		//console.log('setting up returns plugin: ' + account.user)
		$('#pl-returns-plugin').attr('data-user', account.user)
		$('#pl-returns-plugin').attr('data-lang-code', account.lang)
		$('#pl-returns-plugin').attr('data-country-code', account.country)

		const newScript = document.createElement('script')

		if (options.staging) {
			console.log('staging portal')
			newScript.src = 'returns-plugin-staging.js'
			//newScript.src = 'https://staging-returns.parcellab.com/dist/returns-plugin.js'
		} else {
			console.log('production portal')
			newScript.src = 'returns-plugin-production.js'
			//newScript.src = 'https://returns.parcellab.com/dist/returns-plugin.js'

		}

		const returnsTarget = document.getElementById('offcanvas')
		returnsTarget.appendChild(newScript)

		const styles = document.createElement('link')
		styles.id = 'pl-returns-portal-styles'
		styles.rel = 'stylesheet'
		styles.href = 'returns-plugin.css'
		document.getElementsByTagName('head')[0].appendChild(styles)
	})
	
	

	


	

	$('#reset-returns-buttton').on('click', function () {
		const returnsCanvas = Offcanvas.getOrCreateInstance('#offcanvas')
		returnsCanvas.hide()		
	})
})

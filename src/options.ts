// Import our custom CSS
import '../styles/common.scss'

import {
	Account,
	getOptionsMA,
	setOptionsMA,
	StorageOptionsMA,
	destroySettings,
	getCurrentAccount,
	setCurrentAccount
} from './storage'

import { addAccountPannel } from './ux'

const { accounts, language, staging } = getOptionsMA()
console.log(accounts)

$(document).ready(function () {

	try {
		for (let i = 0; i < accounts.length; i++) {
			const account = accounts[i]
			addAccountPannel(account.id)
			$('#name-' + account.id).val(account.name)
			$('#user-' + account.id).val(account.user)
			$('#lang-' + account.id).val(account.lang)
			$('#country-' + account.id).val(account.country)
		}
	} catch (error) {
		console.log('accounts list error: ' + String(error))
	}

	$('.fc').on('change', function () {
		if ($(this).val() == '') {
			$(this).addClass('is-invalid')
		} else {
			$(this).removeClass('is-invalid')
		}
	})

	$('#new-account-btn').on('click', function () {
		const index = $('.account').length
		addAccountPannel(index)
		
		$('.del-account-btn').on('click', function () {
			$(this).parents('.account').remove()
		})
	})

	$('.del-account-btn').on('click', function () {
		$(this).parents('.account').remove()
	})
	



	$('#save-btn').on('click', function () {
		let valid = true

		const optionsMA: StorageOptionsMA = { accounts, language, staging }
		//type ObjectKey = keyof typeof options

		$('.fc').each(function () {
			const val: string = $(this).val() as string

			if (val == '') {
				$(this).addClass('is-invalid')
				valid = false
			} else {
				//const myKey = $(this).attr('id') as ObjectKey
				//options[myKey] = val
				
				//options[$(this).attr('id')] = val

			}
		})


		if (valid) {
			const accountList: Account[] = []
			let i = 0
			$('.account').each(function () {
				const name = String($(this).find('.name').val()).trim()
				const user = String($(this).find('.user').val()).trim()
				const lang = String($(this).find('.lang').val()).trim()
				const country = String($(this).find('.country').val()).trim()

				const anAccount: Account = {
					// id: index,
					id: i,
					name: name,
					user: user,
					lang: lang,
					country: country,
				}
				accountList.push(anAccount)
				i++
			})
			//accountList = accountList.slice(0,-1) + ']'
			optionsMA['accounts'] = accountList
			const currentAccount = getCurrentAccount()
			if (currentAccount == null || (typeof currentAccount === 'string' && currentAccount.trim().length === 0)) {
				setCurrentAccount(accountList[0].id)
			}

			//setOptions(options)
			setOptionsMA(optionsMA)
			chrome.runtime.sendMessage(null, 'accountsUpdated')
			window.close()
		}
	})

	$('#unlock-btn').on('click', function () {
		$(this).toggleClass('btn-outline-success btn-outline-danger')
		$('#unlock-icon').toggleClass('bi-lock-fill bi-unlock-fill')
		$('#destroy-btn').toggleClass('btn-success btn-danger disabled')	
	})

	$('#destroy-btn').on('click', function () {
		destroySettings()
		chrome.runtime.sendMessage(null, 'settingsDestroyed')
		window.close()
	})
	
})

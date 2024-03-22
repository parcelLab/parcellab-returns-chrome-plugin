export interface Account {
	id: number
	name: string
	user: string
	lang: string
	country: string
}

export interface StorageOptions {
	user: string
	token: string
	language: string
	staging: boolean
}

export interface StorageOptionsMA {
	accounts: Account[]
	language: string
	staging: boolean
}

export function getOptions(): StorageOptions {
	return {
		user: localStorage.getItem('user'),
		token: localStorage.getItem('token'),
		language: localStorage.getItem('language'),
		staging: JSON.parse(localStorage.getItem('staging'))
	}
}

export function getOptionsMA(): StorageOptionsMA {
	return {
		accounts: JSON.parse(localStorage.getItem('accounts')),
		language: localStorage.getItem('language'),
		staging: JSON.parse(localStorage.getItem('staging')),
	}
}

export function getLastResult(): string {
	return localStorage.getItem('lastResult')
}



export function setOptionsMA(options: StorageOptionsMA) {
	const accountsString = JSON.stringify(options.accounts)
	localStorage.setItem('accounts', accountsString)
	localStorage.setItem('language', options.language)
}





export function getCurrentAccount() {
	return localStorage.getItem('currentAccount')
}

export function setCurrentAccount(currentAccount) {
	localStorage.setItem('currentAccount', currentAccount)
}

export function destroySettings() {
	localStorage.removeItem('accounts')
	localStorage.removeItem('currentAccount')
	localStorage.removeItem('language')
}
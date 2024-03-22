export function readyPanel(options, lastResult, currentAccount) {
	if (!options.accounts || options.accounts.length < 1) {
		$('#start-return-btn').prop('disabled', true)
		chrome.runtime.openOptionsPage()
	} else {
		for (const account of options.accounts) {
			$('#account-selector').append(
				`
        <option value="${account.id}" data-pl-account-user="${account.user}" data-pl-account-lang="${account.lang}" data-pl-account-country="${account.country}">${account.name}</option>
        `,
			)
		}
    $('#account-selector').val(currentAccount)
		if (options.accounts.length < 2) {
			$('#account-list-selector').hide()
		}
	}
}

export function addAccountPannel(index) {
  $('#accounts').append(
		`
    <div id="account-${index}" class="container bg-light border border-light-subtle rounded-3 mt-3 account" data-account-id="${index}">
      <div class="row g-2 mt-1">
        <div class="mb-3 col-md-6">
            <label for="name-${index}" class="form-label">Account Name</label>
            <input type="text" class="form-control fc name" id="name-${index}" placeholder="Account Name" required>
            <div class="invalid-feedback">
                Please enter Account Name.
            </div>
        </div>
        <div class="mb-3 col-md-6">
          <div class="d-flex justify-content-between">
            <label for="user-${index}" class="form-label">Account ID</label>
            <a id="del-account-btn-${index}" data-account-id="${index}" href="#" role="button" aria-expanded="false" aria-controls="" class="del-account-btn"><i class="bi bi-trash"></i></a>
          </div>
            <input type="text" class="form-control fc user" id="user-${index}" placeholder="User ID" required>
            <div class="invalid-feedback">
                Please enter your Account ID.
            </div>
        </div>
        <div class="mb-3 col-md-6">
            <label for="lang-${index}" class="form-label">Lang/Config Code</label>
            <input type="text" class="form-control fc lang" id="lang-${index}" placeholder="Lang/Config Code" required>
            <div class="invalid-feedback">
                Please enter Lang/Config Code.
            </div>
        </div>
        <div class="mb-3 col-md-6">
            <label for="country-${index}" class="form-label">Country Code</label>
            <input type="text" class="form-control fc country" id="country-${index}" placeholder="Country Code" required>
            <div class="invalid-feedback">
                Please enter Country Code.
            </div>
        </div>
      </div>
    </div>
    `,
	)
}
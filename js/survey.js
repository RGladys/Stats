let submitSurvey = document.getElementById("submit-survey");

function check() {
	for (val in document.getElementsByClassName('input-gender')) {
		if (document.getElementsByClassName('input-gender')[val].checked) {
			for (val in document.getElementsByClassName('input-age')) {
				if (document.getElementsByClassName('input-age')[val].checked) {
					for (val in document.getElementsByClassName('input-music')) {
						if (document.getElementsByClassName('input-music')[val].checked) {
							for (val in document.getElementsByClassName('input-movies')) {
								if (document.getElementsByClassName('input-movies')[val].checked) {
									for (val in document.getElementsByClassName('input-color')) {
										if (document.getElementsByClassName('input-color')[val].checked) {
											for (val in document.getElementsByClassName('input-animal')) {
												if (document.getElementsByClassName('input-animal')[val].checked) {
													for (val in document.getElementsByClassName('input-place')) {
														if (document.getElementsByClassName('input-place')[val].checked) {
															for (val in document.getElementsByClassName('input-worldview')) {
																if (document.getElementsByClassName('input-worldview')[val].checked) {
																	for (val in document.getElementsByClassName('input-religion')) {
																		if (document.getElementsByClassName('input-religion')[val].checked) {
																			submitSurvey.removeAttribute('disabled'); 
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}


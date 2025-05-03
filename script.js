document.addEventListener('DOMContentLoaded', () => {
	// Функция для отправки сообщения в Telegram
	async function sendTelegramMessage(botToken, chatIds, message) {
		const promises = chatIds.map(async chatId => {
			try {
				const response = await fetch(
					`https://api.telegram.org/bot${botToken}/sendMessage`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							chat_id: chatId,
							text: message,
							parse_mode: 'Markdown', // Для форматирования текста
						}),
					}
				)
				return response.ok
			} catch (error) {
				console.error(
					`Ошибка отправки в Telegram для chat_id ${chatId}:`,
					error
				)
				return false
			}
		})

		const results = await Promise.all(promises)
		return results.some(success => success) // Проверяем, что хотя бы один запрос успешен
	}

	// Общий токен для нового бота
	const botToken = '8011019754:AAEK5vWboIdoPfqZbWf68iFLJ4lsjmRHfUQ' // Новый токен
	const chatIds = ['1264633700', '987654321'] // Chat ID для вас и друга

	// Обработка формы "Начать" (модальное окно)
	const feedbackForm = document.getElementById('feedbackForm')
	if (feedbackForm) {
		feedbackForm.addEventListener('submit', async e => {
			e.preventDefault()

			const formData = new FormData(feedbackForm)
			const name = formData.get('name')
			const phone = formData.get('phone')

			// Валидация
			if (!name || !phone) {
				alert('Пожалуйста, заполните все поля.')
				return
			}

			const message = `*Новая заявка на консультацию*:\n\n👤 Имя: ${name}\n📞 Номер телефона: ${phone}`

			const success = await sendTelegramMessage(botToken, chatIds, message)
			if (success) {
				alert('Ваш запрос успешно отправлен!')
				feedbackForm.reset()
				const modal = document.getElementById('contactModal')
				if (modal) modal.style.display = 'none'
			} else {
				alert('Ошибка при отправке. Попробуйте снова.')
			}
		})
	}

	// Обработка формы "Свяжитесь с нами" (в footer)
	const contactForm = document.getElementById('contactForm')
	if (contactForm) {
		contactForm.addEventListener('submit', async e => {
			e.preventDefault()

			const formData = new FormData(contactForm)
			const phone = formData.get('phone')

			// Валидация
			if (!phone) {
				alert('Пожалуйста, укажите номер телефона.')
				return
			}

			const message = `*Новый запрос на связь (Footer)*:\n\n📞 Номер телефона: ${phone}`

			const success = await sendTelegramMessage(botToken, chatIds, message)
			if (success) {
				alert('Ваш номер успешно отправлен!')
				contactForm.reset()
			} else {
				alert('Ошибка при отправке. Попробуйте снова.')
			}
		})
	}

	// Обработка формы "Контакты" (на странице contact.html)
	const contactPageForm = document.querySelector('#feedbackForm.contact-page')
	if (contactPageForm) {
		contactPageForm.addEventListener('submit', async e => {
			e.preventDefault()

			const formData = new FormData(contactPageForm)
			const name = formData.get('name')
			const phone = formData.get('phone')
			const messageText = formData.get('message')

			// Валидация
			if (!name || !phone || !messageText) {
				alert('Пожалуйста, заполните все поля.')
				return
			}

			const message = `*Новый запрос с Contact Page*:\n\n👤 Имя: ${name}\n📞 Номер телефона: ${phone}\n💬 Сообщение: ${messageText}`

			const success = await sendTelegramMessage(botToken, chatIds, message)
			if (success) {
				alert('Ваш запрос успешно отправлен!')
				contactPageForm.reset()
			} else {
				alert('Ошибка при отправке. Попробуйте снова.')
			}
		})
	}
})

document.addEventListener('DOMContentLoaded', () => {
	const burgerMenu = document.getElementById('burgerMenu')
	const navMenu = document.getElementById('navMenu')

	if (burgerMenu && navMenu) {
		burgerMenu.addEventListener('click', () => {
			navMenu.classList.toggle('active')
			burgerMenu.classList.toggle('open')
		})
	}
})

document.addEventListener('DOMContentLoaded', () => {
	// Открытие и закрытие модального окна
	const openModalButton = document.getElementById('openModal')
	const closeModalButton = document.getElementById('closeModal')
	const modal = document.getElementById('contactModal')

	if (openModalButton && closeModalButton && modal) {
		openModalButton.addEventListener('click', () => {
			modal.style.display = 'flex'
		})

		closeModalButton.addEventListener('click', () => {
			modal.style.display = 'none'
		})

		window.addEventListener('click', e => {
			if (e.target === modal) {
				modal.style.display = 'none'
			}
		})
	}
})

document.addEventListener('DOMContentLoaded', function () {
	const burgerMenu = document.getElementById('burgerMenu')
	const navMenu = document.getElementById('navMenu')

	// Открытие/закрытие меню
	burgerMenu.addEventListener('click', function () {
		this.classList.toggle('active')
		navMenu.classList.toggle('active')
	})

	// Закрытие меню при клике на пункт меню
	const menuItems = document.querySelectorAll('.menu li a')
	menuItems.forEach(item => {
		item.addEventListener('click', function () {
			burgerMenu.classList.remove('active')
			navMenu.classList.remove('active')
		})
	})

	// Закрытие меню при клике вне его
	document.addEventListener('click', function (event) {
		const isClickInside =
			navMenu.contains(event.target) || burgerMenu.contains(event.target)

		if (!isClickInside && navMenu.classList.contains('active')) {
			burgerMenu.classList.remove('active')
			navMenu.classList.remove('active')
		}
	})
})

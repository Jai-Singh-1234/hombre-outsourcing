//
// Theme Management
//
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.applyTheme()
    this.setupToggle()
    this.setupMobileToggle()
  }

  applyTheme() {
    if (this.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    this.updateToggleIcon()
    this.updateMobileToggleIcon()
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light"
    localStorage.setItem("theme", this.theme)
    this.applyTheme()
  }

  updateToggleIcon() {
    const sunIcon = document.getElementById("sun-icon")
    const moonIcon = document.getElementById("moon-icon")

    if (this.theme === "dark") {
      sunIcon?.classList.remove("hidden")
      moonIcon?.classList.add("hidden")
    } else {
      sunIcon?.classList.add("hidden")
      moonIcon?.classList.remove("hidden")
    }
  }

  updateMobileToggleIcon() {
    const mobileSunIcon = document.getElementById("mobile-sun-icon")
    const mobileMoonIcon = document.getElementById("mobile-moon-icon")

    if (this.theme === "dark") {
      mobileSunIcon?.classList.remove("hidden")
      mobileMoonIcon?.classList.add("hidden")
    } else {
      mobileSunIcon?.classList.add("hidden")
      mobileMoonIcon?.classList.remove("hidden")
    }
  }

  setupToggle() {
    const toggleButton = document.getElementById("theme-toggle")
    if (toggleButton) {
      toggleButton.addEventListener("click", () => this.toggleTheme())
    }
  }

  setupMobileToggle() {
    const mobileToggleButton = document.getElementById("mobile-theme-toggle")
    if (mobileToggleButton) {
      mobileToggleButton.addEventListener("click", () => this.toggleTheme())
    }
  }
}

//
// Mobile Menu Management
//
class MobileMenu {
  constructor() {
    this.isOpen = false
    this.init()
  }

  init() {
    const toggleButton = document.getElementById("mobile-menu-button")
    const menu = document.getElementById("mobile-menu")

    if (toggleButton && menu) {
      toggleButton.addEventListener("click", () => this.toggle())
    }
  }

  toggle() {
    const menu = document.getElementById("mobile-menu")
    if (menu) {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        menu.classList.remove("hidden")
      } else {
        menu.classList.add("hidden")
      }
    }
  }

  close() {
    const menu = document.getElementById("mobile-menu")
    if (menu) {
      this.isOpen = false
      menu.classList.add("hidden")
    }
  }
}

//
// Contact Form Management
//
class ContactForm {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.successMessage = document.getElementById("success-message")
    this.init()
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(this.form)
    const data = Object.fromEntries(formData)

    if (!this.validateForm(data)) {
      return
    }

    this.setLoading(true)

    try {
      await this.submitForm(data)
      this.showSuccess()
      this.form.reset()
    } catch (error) {
      this.showError("Failed to send message. Please try again.")
    } finally {
      this.setLoading(false)
    }
  }

  validateForm(data) {
    let isValid = true
    this.clearErrors()

    const requiredFields = ["firstName", "lastName", "email", "phone", "service", "message"]
    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        this.showFieldError(field, "This field is required")
        isValid = false
      }
    })

    if (data.email && !this.isValidEmail(data.email)) {
      this.showFieldError("email", "Please enter a valid email address")
      isValid = false
    }

    if (data.phone && !this.isValidPhone(data.phone)) {
      this.showFieldError("phone", "Please enter a valid phone number")
      isValid = false
    }

    return isValid
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  isValidPhone(phone) {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))
  }

  showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName)
    if (field) {
      field.classList.add("form-error")

      let errorElement = field.parentNode.querySelector(".error-message")
      if (!errorElement) {
        errorElement = document.createElement("p")
        errorElement.className = "error-message text-red-500 text-sm mt-1"
        field.parentNode.appendChild(errorElement)
      }
      errorElement.textContent = message
    }
  }

  clearErrors() {
    const errorFields = this.form.querySelectorAll(".form-error")
    errorFields.forEach((field) => field.classList.remove("form-error"))

    const errorMessages = this.form.querySelectorAll(".error-message")
    errorMessages.forEach((message) => message.remove())
  }

  async submitForm(data) {
    // Simulated API call; replace with real endpoint if needed
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Form submitted:", data)
        resolve()
      }, 1000)
    })
  }

  showSuccess() {
    if (this.successMessage) {
      this.successMessage.classList.remove("hidden")
      setTimeout(() => {
        this.successMessage.classList.add("hidden")
      }, 5000)
    }
  }

  showError(message) {
    alert(message)
  }

  setLoading(loading) {
    const submitButton = this.form.querySelector('button[type="submit"]')
    if (submitButton) {
      if (loading) {
        submitButton.textContent = "Sending..."
        submitButton.disabled = true
        this.form.classList.add("loading")
      } else {
        submitButton.textContent = "Send Message"
        submitButton.disabled = false
        this.form.classList.remove("loading")
      }
    }
  }
}

//
// BackToTop button
//
class BackToTop {
  constructor() {
    this.button = null
    this.init()
  }

  init() {
    this.createButton()
    this.setupScrollListener()
  }

  createButton() {
    this.button = document.createElement("button")
    this.button.className = "back-to-top"
    this.button.setAttribute("aria-label", "Back to top")
    this.button.innerHTML = `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    `
    this.button.addEventListener("click", () => this.scrollToTop())
    document.body.appendChild(this.button)
  }

  setupScrollListener() {
    let ticking = false
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.toggleVisibility()
          ticking = false
        })
        ticking = true
      }
    })
  }

  toggleVisibility() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop > 2) {
      this.button.classList.add("visible")
    } else {
      this.button.classList.remove("visible")
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

//
// Page transition
//
class PageTransition {
  constructor() {
    this.init()
  }

  init() {
    this.setupPageLoad()
    this.setupLinkTransitions()
  }

  setupPageLoad() {
    const main = document.querySelector("main")
    if (main) {
      main.classList.add("page-transition")
      setTimeout(() => {
        main.classList.add("loaded")
      }, 100)
    }
  }

  setupLinkTransitions() {
    const internalLinks = document.querySelectorAll(
      'a[href^="./"], a[href^="/"], a[href*="' + window.location.hostname + '"]',
    )
    internalLinks.forEach((link) => {
      if (
        link.href.startsWith("tel:") ||
        link.href.startsWith("mailto:") ||
        link.href.startsWith("https://wa.me/") ||
        link.target === "_blank"
      ) {
        return
      }
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href")
        if (href && (href.endsWith(".html") || href === "index.html")) {
          e.preventDefault()
          this.transitionToPage(href)
        }
      })
    })
  }

  transitionToPage(href) {
    const main = document.querySelector("main")
    if (main) {
      main.classList.remove("loaded")
      setTimeout(() => {
        window.location.href = href
      }, 250)
    } else {
      window.location.href = href
    }
  }
}

//
// Language Management (local i18n only — Google Translate removed)
//
class LanguageManager {
  constructor() {
    this.lang = localStorage.getItem("lang") || "en"
    this.translations = this.getTranslations()
    this.init()
  }

  init() {
    this.applyLanguage()
    this.setupSelectors()
  }

  setupSelectors() {
    const selects = document.querySelectorAll(".language-select")
    selects.forEach((sel) => {
      sel.value = this.lang
      sel.addEventListener("change", (e) => {
        const value = e.target.value
        this.setLanguage(value)
        selects.forEach((other) => {
          if (other !== sel) other.value = value
        })
      })
    })
  }

  setLanguage(lang) {
    this.lang = lang
    localStorage.setItem("lang", lang)
    this.applyLanguage()
  }

  applyLanguage() {
    const dict = this.translations[this.lang] || {}

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n")
      const value = dict[key]
      if (value) {
        el.textContent = value
      }
    })

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const attr = el.getAttribute("data-i18n-attr")
      const key = el.getAttribute("data-i18n-key")
      const value = dict[key]
      if (attr && key && value) {
        el.setAttribute(attr, value)
      }
    })
  }

  getTranslations() {
    return {
      en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.services": "Services",
        "nav.job": "Job Placement",
        "nav.blog": "Blog",
        "nav.contact": "Contact",
        "hero.title1": "Professional Healthcare Services",
        "hero.title2": "24x7 Available",
        "hero.subtitle":
          "Trusted healthcare and job placement services in Punjab. Expert nursing care, elderly support, and professional staffing solutions.",
        "cta.contact": "Contact US",
        "cta.whatsapp": "💬 WhatsApp Chat",
        "blog.title": "Blog & Updates",
        "blog.subtitle":
          "Weekly posts on care, staffing, and community updates. New website—starting with a few helpful reads.",
      },
      hi: {
        "nav.home": "होम",
        "nav.about": "हमारे बारे में",
        "nav.services": "सेवाएँ",
        "nav.job": "जॉब प्लेसमेंट",
        "nav.blog": "ब्लॉग",
        "nav.contact": "संपर्क",
        "hero.title1": "व्यावसायिक स्वास्थ्य सेवा",
        "hero.title2": "24x7 उपलब्ध",
        "hero.subtitle": "पंजाब में विश्वसनीय स्वास्थ्य और जॉब प्लेसमेंट सेवाएँ। विशेषज्ञ नर्सिंग केयर, बुजुर्ग सहायता और स्टाफिंग समाधान।",
        "cta.contact": "संपर्क करें",
        "cta.whatsapp": "💬 व्हाट्सऐप चैट",
        "blog.title": "ब्लॉग और अपडेट्स",
        "blog.subtitle": "देखभाल, स्टाफिंग और समुदाय पर साप्ताहिक पोस्ट। नई वेबसाइट—कुछ उपयोगी लेखों के साथ शुरुआत।",
      },
      pa: {
        "nav.home": "ਹੋਮ",
        "nav.about": "ਸਾਡੇ ਬਾਰੇ",
        "nav.services": "ਸੇਵਾਵਾਂ",
        "nav.job": "ਨੌਕਰੀ ਪਲੇਸਮੈਂਟ",
        "nav.blog": "ਬਲੌਗ",
        "nav.contact": "ਸੰਪਰਕ",
        "hero.title1": "ਪੇਸ਼ਾਵਰ ਹੈਲਥਕੇਅਰ ਸੇਵਾਵਾਂ",
        "hero.title2": "24x7 ਉਪਲਬਧ",
        "hero.subtitle": "ਪੰਜਾਬ ਵਿੱਚ ਭਰੋਸੇਯੋਗ ਹੈਲਥਕੇਅਰ ਅਤੇ ਨੌਕਰੀ ਪਲੇਸਮੈਂਟ ਸੇਵਾਵਾਂ। ਮਾਹਿਰ ਨਰਸਿੰਗ ਕੇਅਰ, ਬਜ਼ੁਰਗਾਂ ਲਈ ਸਹਾਇਤਾ ਅਤੇ ਸਟਾਫਿੰਗ ਹੱਲ।",
        "cta.contact": "ਸੰਪਰਕ ਕਰੋ",
        "cta.whatsapp": "💬 ਵਟਸਐਪ ਚੈਟ",
        "blog.title": "ਬਲੌਗ ਅਤੇ ਅਪਡੇਟਸ",
        "blog.subtitle": "ਦੇਖਭਾਲ, ਸਟਾਫਿੰਗ ਅਤੇ ਕਮੀਉਨਿਟੀ ਬਾਰੇ ਹਫਤਾਵਾਰੀ ਲੇਖ। ਨਵੀਂ ਵੈੱਬਸਾਈਟ—ਕੁਝ ਮਦਦਗਾਰ ਪੜ੍ਹਾਈ ਨਾਲ ਸ਼ੁਰੂਆਤ।",
      },
    }
  }
}

// Initialize on DOM ready (no Google Translate)
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
  new MobileMenu()
  new ContactForm()
  new BackToTop()
  new PageTransition()
  new LanguageManager()
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const mobileMenu = document.getElementById("mobile-menu")
  const toggleButton = document.getElementById("mobile-menu-button")
  if (mobileMenu && !mobileMenu.contains(e.target) && !toggleButton?.contains(e.target)) {
    mobileMenu.classList.add("hidden")
  }
})

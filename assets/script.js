// Theme Management
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

// Mobile Menu Management
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

// Contact Form Management
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

    // Get form data
    const formData = new FormData(this.form)
    const data = Object.fromEntries(formData)

    // Validate form
    if (!this.validateForm(data)) {
      return
    }

    // Show loading state
    this.setLoading(true)

    try {
      // Simulate form submission (replace with actual endpoint)
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

    // Reset previous errors
    this.clearErrors()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "phone", "service", "message"]

    requiredFields.forEach((field) => {
      if (!data[field] || data[field].trim() === "") {
        this.showFieldError(field, "This field is required")
        isValid = false
      }
    })

    // Validate email format
    if (data.email && !this.isValidEmail(data.email)) {
      this.showFieldError("email", "Please enter a valid email address")
      isValid = false
    }

    // Validate phone format
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

      // Create or update error message
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
    // Remove error classes
    const errorFields = this.form.querySelectorAll(".form-error")
    errorFields.forEach((field) => field.classList.remove("form-error"))

    // Remove error messages
    const errorMessages = this.form.querySelectorAll(".error-message")
    errorMessages.forEach((message) => message.remove())
  }

  async submitForm(data) {
    // Simulate API call - replace with actual endpoint
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
    alert(message) // Replace with better error handling
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

// BackToTop button functionality
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
}

// Page transition functionality
class PageTransition {
  constructor() {
    this.init()
  }

  init() {
    this.setupPageLoad()
    this.setupLinkTransitions()
  }

  setupPageLoad() {
    // Add transition class to main content
    const main = document.querySelector("main")
    if (main) {
      main.classList.add("page-transition")

      // Trigger transition after a short delay
      setTimeout(() => {
        main.classList.add("loaded")
      }, 100)
    }
  }

  setupLinkTransitions() {
    // Add smooth transitions to internal links
    const internalLinks = document.querySelectorAll(
      'a[href^="./"], a[href^="/"], a[href*="' + window.location.hostname + '"]',
    )

    internalLinks.forEach((link) => {
      // Skip external links, phone links, email links, etc.
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

        // Only handle HTML page links
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

// Language Management
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
    // support multiple selectors (desktop + mobile)
    const selects = document.querySelectorAll(".language-select")
    selects.forEach((sel) => {
      // set current value on load
      sel.value = this.lang
      sel.addEventListener("change", (e) => {
        const value = e.target.value
        this.setLanguage(value)
        // sync other selectors
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

    // Elements with text content
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n")
      const value = dict[key]
      if (value) {
        el.textContent = value
      }
    })

    // Elements with attribute targets: data-i18n-attr="placeholder|aria-label|title"
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
    // Minimal in-file dictionary. If a key is missing, original text remains.
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

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
  new MobileMenu()
  new ContactForm()
  new BackToTop()
  new PageTransition()
  new LanguageManager()
  // Google Translate Initialization
  ensureGadgetContainer()
  relaxNoTranslate()
  buildTranslatorUI()
  loadGoogleTranslate().then(() => applySavedLanguageWhenReady())
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const mobileMenu = document.getElementById("mobile-menu")
  const toggleButton = document.getElementById("mobile-menu-button")

  if (mobileMenu && !mobileMenu.contains(e.target) && !toggleButton.contains(e.target)) {
    mobileMenu.classList.add("hidden")
  }
})

// Expose Google Translate helper functions in module scope
function ensureGadgetContainer() {
  if (!document.getElementById("google_translate_element")) {
    const div = document.createElement("div")
    div.id = "google_translate_element"
    document.body.appendChild(div)
  }
}

function relaxNoTranslate() {
  try {
    // Make sure the whole document is allowed to translate
    if (document.documentElement.getAttribute("translate") === "no") {
      document.documentElement.setAttribute("translate", "yes")
    }
    // Remove meta notranslate if present
    const badMeta = document.querySelector('meta[name="google"][content="notranslate"]')
    if (badMeta) badMeta.parentNode.removeChild(badMeta)
    // Remove .notranslate from content wrappers (keep on GT containers if any)
    document.querySelectorAll(".notranslate").forEach((el) => {
      if (!el.id || !el.id.startsWith("google_translate")) {
        el.classList.remove("notranslate")
      }
    })
  } catch {
    // no-op
  }
}

function loadGoogleTranslate() {
  return new Promise((resolve) => {
    if (window.google && window.google.translate) return resolve()
    const gt = document.createElement("script")
    gt.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    window.googleTranslateElementInit = () => {
      try {
        // pageLanguage auto-detect; include all langs; do not auto-show banner
        new window.google.translate.TranslateElement(
          { pageLanguage: "auto", autoDisplay: false },
          "google_translate_element",
        )
      } catch (e) {
        // no-op
      }
      resolve()
    }
    document.head.appendChild(gt)
  })
}

function selectLanguage(langCode) {
  const combo = document.querySelector(".goog-te-combo")
  if (!combo) return
  combo.value = langCode // '' keeps Auto detect
  combo.dispatchEvent(new Event("change"))
  try {
    localStorage.setItem("preferredLanguage", langCode || "")
  } catch {}
}

function applySavedLanguageWhenReady() {
  const saved = (localStorage.getItem("preferredLanguage") || "").trim()
  // If nothing stored, nothing to apply
  if (saved === null) return
  const t = setInterval(() => {
    const combo = document.querySelector(".goog-te-combo")
    if (combo) {
      clearInterval(t)
      if (saved !== null) selectLanguage(saved)
    }
  }, 200)
  setTimeout(() => clearInterval(t), 10000)
}

function buildTranslatorUI() {
  const themeToggle = document.querySelector("[data-theme-toggle], #theme-toggle, .theme-toggle")
  const wrapper = document.createElement("span")
  wrapper.className = "translator-wrapper"
  wrapper.setAttribute("role", "group")

  const btn = document.createElement("button")
  btn.type = "button"
  btn.className = "translator-trigger"
  btn.setAttribute("aria-label", "Translate page")
  // Simple translate icon
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h16M4 12h8M4 19h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `

  const menu = document.createElement("div")
  menu.className = "translator-menu"
  menu.setAttribute("role", "menu")

  const search = document.createElement("input")
  search.type = "search"
  search.placeholder = "Search language..."
  search.className = "translator-search"
  menu.appendChild(search)

  const list = document.createElement("div")
  menu.appendChild(list)

  // Broad language set (extend as needed)
  const langs = [
    ["Auto detect", ""],
    ["English", "en"],
    ["Spanish", "es"],
    ["French", "fr"],
    ["German", "de"],
    ["Portuguese", "pt"],
    ["Italian", "it"],
    ["Dutch", "nl"],
    ["Polish", "pl"],
    ["Russian", "ru"],
    ["Ukrainian", "uk"],
    ["Arabic", "ar"],
    ["Hebrew", "iw"],
    ["Hindi", "hi"],
    ["Urdu", "ur"],
    ["Bengali", "bn"],
    ["Gujarati", "gu"],
    ["Punjabi", "pa"],
    ["Marathi", "mr"],
    ["Tamil", "ta"],
    ["Telugu", "te"],
    ["Kannada", "kn"],
    ["Malayalam", "ml"],
    ["Chinese (Simplified)", "zh-CN"],
    ["Chinese (Traditional)", "zh-TW"],
    ["Japanese", "ja"],
    ["Korean", "ko"],
    ["Turkish", "tr"],
    ["Vietnamese", "vi"],
    ["Thai", "th"],
    ["Indonesian", "id"],
    ["Malay", "ms"],
    ["Greek", "el"],
    ["Czech", "cs"],
    ["Slovak", "sk"],
    ["Hungarian", "hu"],
    ["Romanian", "ro"],
    ["Bulgarian", "bg"],
    ["Swedish", "sv"],
    ["Norwegian", "no"],
    ["Danish", "da"],
    ["Finnish", "fi"],
    ["Filipino", "tl"],
    ["Afrikaans", "af"],
    ["Amharic", "am"],
    ["Azerbaijani", "az"],
    ["Basque", "eu"],
    ["Belarusian", "be"],
    ["Catalan", "ca"],
    ["Croatian", "hr"],
    ["Estonian", "et"],
    ["Georgian", "ka"],
    ["Hausa", "ha"],
    ["Icelandic", "is"],
    ["Irish", "ga"],
    ["Latvian", "lv"],
    ["Lithuanian", "lt"],
    ["Macedonian", "mk"],
    ["Maltese", "mt"],
    ["Mongolian", "mn"],
    ["Nepali", "ne"],
    ["Persian", "fa"],
    ["Serbian", "sr"],
    ["Sinhala", "si"],
    ["Slovenian", "sl"],
    ["Swahili", "sw"],
    ["Tajik", "tg"],
    ["Tatar", "tt"],
    ["Uzbek", "uz"],
    ["Yoruba", "yo"],
    ["Zulu", "zu"],
  ]

  const renderList = (filter = "") => {
    list.innerHTML = ""
    langs
      .filter(([name]) => name.toLowerCase().includes(filter.toLowerCase()))
      .forEach(([name, code]) => {
        const item = document.createElement("button")
        item.type = "button"
        item.className = "translator-item"
        item.textContent = name
        item.setAttribute("data-lang", code)
        item.addEventListener("click", () => {
          selectLanguage(code)
          menu.classList.remove("open")
        })
        list.appendChild(item)
      })
  }
  renderList()
  search.addEventListener("input", () => renderList(search.value))

  wrapper.appendChild(btn)
  wrapper.appendChild(menu)

  if (themeToggle && themeToggle.parentNode) {
    themeToggle.parentNode.insertBefore(wrapper, themeToggle.nextSibling)
  } else {
    // Fallback if a theme toggle isn’t found
    wrapper.style.position = "fixed"
    wrapper.style.top = "12px"
    wrapper.style.right = "12px"
    document.body.appendChild(wrapper)
  }

  btn.addEventListener("click", () => menu.classList.toggle("open"))
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) menu.classList.remove("open")
  })
}

window.hideGTRibbon = () => {
  document.documentElement.removeAttribute("data-show-gt-banner")
}
window.showGTRibbon = () => {
  document.documentElement.setAttribute("data-show-gt-banner", "true")
}

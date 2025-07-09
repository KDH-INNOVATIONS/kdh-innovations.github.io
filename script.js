   // Theme Management
        function toggleTheme() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }

        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.body.setAttribute('data-theme', savedTheme);
        }

        // Render Links
        function renderLinks() {
            const container = document.getElementById('linksContainer');
            container.innerHTML = siteData.links.map((link, index) => {
              // If link.icon is a string that represents an image filename, use <img>, else render as HTML (for SVG or icon fonts)
              let iconHtml = '';
              if (link.icon && link.icon.endsWith('.png') || link.icon.endsWith('.jpg') || link.icon.endsWith('.jpeg') || link.icon.endsWith('.svg') || link.icon.endsWith('.gif')) {
                iconHtml = `<img src="assets/${link.icon}" alt="${link.title} icon" class="link-icon-img">`;
              } else {
                iconHtml = `<span class="link-icon">${link.icon || ''}</span>`;
              }
              return `
                <a href="${link.url}" class="link-item loading" style="animation-delay: ${index * 0.1}s" onclick="handleLinkClick(event, '${link.title}')">
                  <div class="link-icon">${iconHtml}</div>
                  <div class="link-title">${link.title}</div>
                  <div class="link-description">${link.description}</div>
                  <div class="link-badge">${link.badge}</div>
                </a>
              `;
            }).join('');   }

        // Render Social Links
        function renderSocialLinks() {
            const container = document.getElementById('socialLinks');
            container.innerHTML = siteData.socialLinks.map((social, index) => {
              let iconHtml = '';
              if (
                social.icon &&
                (social.icon.endsWith('.png') ||
                 social.icon.endsWith('.jpg') ||
                 social.icon.endsWith('.jpeg') ||
                 social.icon.endsWith('.svg') ||
                 social.icon.endsWith('.gif'))
              ) {
                iconHtml = `<img src="assets/${social.icon}" alt="${social.title || 'social'} icon" class="social-icon-img">`;
              } else {
                iconHtml = `<span class="social-icon">${social.icon || ''}</span>`;
              }
              return `
                <a href="${social.url}" class="social-link loading" style="animation-delay: ${(siteData.links.length + index) * 0.1}s" target="_blank" rel="noopener noreferrer">
                  ${iconHtml}
                </a>
              `;
            }).join('');   }

        // Handle Link Clicks
        function handleLinkClick(event, title) {
            // Add click animation
            event.currentTarget.style.transform = 'scale(0.95)';
            setTimeout(() => {
                event.currentTarget.style.transform = 'translateY(-8px)';
            }, 100);

            // You can add analytics tracking here
            console.log(`Clicked on: ${title}`);
        }

        // Initialize Page
        function init() {
            initTheme();
            renderLinks();
            renderSocialLinks();
        }

        // Run on page load
        document.addEventListener('DOMContentLoaded', init);

        // Add some interactive effects
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.bg-animation::before');
            if (cursor) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }
        });

        // Smooth scrolling for internal links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
    });
import React from 'react'
import styles from './styles.module.scss'

export type FooterVariant = 'default' | 'minimal' | 'centered' | 'stacked'

export interface FooterLink {
	label: string
	href: string
	external?: boolean
}

export interface FooterSection {
	title: string
	links: FooterLink[]
}

export interface SocialLink {
	platform: string
	href: string
	icon?: React.ReactNode
}

export interface FooterProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
	/** Footer variant style */
	variant?: FooterVariant
	/** Company or brand name */
	brandName?: string
	/** Brand logo */
	brandLogo?: React.ReactNode
	/** Brand description or tagline */
	brandDescription?: string
	/** Footer sections with links */
	sections?: FooterSection[]
	/** Social media links */
	socialLinks?: SocialLink[]
	/** Copyright text */
	copyright?: string
	/** Show current year in copyright */
	showYear?: boolean
	/** Bottom links (Privacy, Terms, etc) */
	bottomLinks?: FooterLink[]
	/** Additional content */
	children?: React.ReactNode
}

export function Footer({
	variant = 'default',
	brandName,
	brandLogo,
	brandDescription,
	sections = [],
	socialLinks = [],
	copyright,
	showYear = true,
	bottomLinks = [],
	children,
	className = '',
	...props
}: FooterProps) {
	const currentYear = new Date().getFullYear()

	const renderBrand = () => {
		if (!brandName && !brandLogo && !brandDescription) return null

		return (
			<div className={styles.brand}>
				{(brandLogo || brandName) && (
					<div className={styles.brandHeader}>
						{brandLogo && <div className={styles.brandLogo}>{brandLogo}</div>}
						{brandName && <div className={styles.brandName}>{brandName}</div>}
					</div>
				)}
				{brandDescription && (
					<p className={styles.brandDescription}>{brandDescription}</p>
				)}
			</div>
		)
	}

	const renderSections = () => {
		if (sections.length === 0) return null

		return (
			<div className={styles.sections}>
				{sections.map((section, index) => (
					<div key={index} className={styles.section}>
						<h3 className={styles.sectionTitle}>{section.title}</h3>
						<ul className={styles.linkList}>
							{section.links.map((link, linkIndex) => (
								<li key={linkIndex}>
									<a
										href={link.href}
										className={styles.link}
										target={link.external ? '_blank' : undefined}
										rel={link.external ? 'noopener noreferrer' : undefined}
									>
										{link.label}
										{link.external && (
											<span className={styles.externalIcon} aria-label="Opens in new tab">
												↗
											</span>
										)}
									</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		)
	}

	const renderSocialLinks = () => {
		if (socialLinks.length === 0) return null

		return (
			<div className={styles.social}>
				<div className={styles.socialTitle}>Follow Us</div>
				<div className={styles.socialLinks}>
					{socialLinks.map((social, index) => (
						<a
							key={index}
							href={social.href}
							className={styles.socialLink}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={social.platform}
						>
							{social.icon || social.platform}
						</a>
					))}
				</div>
			</div>
		)
	}

	const renderBottom = () => {
		const copyrightText = copyright || (brandName ? `© ${brandName}` : '© All rights reserved')
		const fullCopyright = showYear ? `${copyrightText} ${currentYear}` : copyrightText

		return (
			<div className={styles.bottom}>
				<div className={styles.copyright}>{fullCopyright}</div>
				{bottomLinks.length > 0 && (
					<div className={styles.bottomLinks}>
						{bottomLinks.map((link, index) => (
							<React.Fragment key={index}>
								<a
									href={link.href}
									className={styles.bottomLink}
									target={link.external ? '_blank' : undefined}
									rel={link.external ? 'noopener noreferrer' : undefined}
								>
									{link.label}
								</a>
								{index < bottomLinks.length - 1 && (
									<span className={styles.separator}>•</span>
								)}
							</React.Fragment>
						))}
					</div>
				)}
			</div>
		)
	}

	return (
		<footer className={`${styles.footer} ${styles[variant]} ${className}`} {...props}>
			<div className={styles.container}>
				{variant === 'centered' ? (
					<>
						<div className={styles.centeredContent}>
							{renderBrand()}
							{renderSocialLinks()}
						</div>
						{sections.length > 0 && (
							<div className={styles.centeredSections}>
								{renderSections()}
							</div>
						)}
						{children && <div className={styles.children}>{children}</div>}
						{renderBottom()}
					</>
				) : variant === 'stacked' ? (
					<>
						{renderBrand()}
						{renderSections()}
						{renderSocialLinks()}
						{children && <div className={styles.children}>{children}</div>}
						{renderBottom()}
					</>
				) : (
					<>
						<div className={styles.main}>
							{renderBrand()}
							{renderSections()}
						</div>
						{(socialLinks.length > 0 || children) && (
							<div className={styles.sidebar}>
								{renderSocialLinks()}
								{children && <div className={styles.children}>{children}</div>}
							</div>
						)}
						{renderBottom()}
					</>
				)}
			</div>
		</footer>
	)
}

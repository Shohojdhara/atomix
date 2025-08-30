import React, { forwardRef } from 'react';
import { FooterSocialLinkProps } from '../../lib/types/components';

/**
 * FooterSocialLink component provides styled social media links with platform-specific icons.
 *
 * @example
 * ```tsx
 * <FooterSocialLink platform="twitter" url="https://twitter.com/company" />
 * <FooterSocialLink platform="custom" url="https://example.com" icon={<CustomIcon />} label="Custom Platform" />
 * ```
 */
export const FooterSocialLink = forwardRef<HTMLAnchorElement, FooterSocialLinkProps>(
  (
    {
      platform,
      url,
      icon,
      label,
      size = 'md',
      variant = 'default',
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const getPlatformIcon = (platform: string) => {
      const icons: Record<string, string> = {
        facebook: '📘',
        twitter: '🐦',
        instagram: '📷',
        linkedin: '💼',
        youtube: '📺',
        github: '🐙',
        discord: '🎮',
        tiktok: '🎵',
        pinterest: '📌',
        snapchat: '👻',
        whatsapp: '💬',
        telegram: '✈️',
        reddit: '🤖',
        twitch: '🎮',
        spotify: '🎵',
        dribbble: '🏀',
        behance: '🎨',
        medium: '📝',
        dev: '👨‍💻',
        codepen: '✏️',
      };
      return icons[platform] || '🔗';
    };

    const getPlatformLabel = (platform: string) => {
      const labels: Record<string, string> = {
        facebook: 'Facebook',
        twitter: 'Twitter',
        instagram: 'Instagram',
        linkedin: 'LinkedIn',
        youtube: 'YouTube',
        github: 'GitHub',
        discord: 'Discord',
        tiktok: 'TikTok',
        pinterest: 'Pinterest',
        snapchat: 'Snapchat',
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        reddit: 'Reddit',
        twitch: 'Twitch',
        spotify: 'Spotify',
        dribbble: 'Dribbble',
        behance: 'Behance',
        medium: 'Medium',
        dev: 'Dev.to',
        codepen: 'CodePen',
      };
      return labels[platform] || platform;
    };

    const linkClass = [
      'c-footer__social-link',
      `c-footer__social-link--${platform}`,
      `c-footer__social-link--${size}`,
      `c-footer__social-link--${variant}`,
      disabled && 'c-footer__social-link--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const ariaLabel = label || `Follow us on ${getPlatformLabel(platform)}`;

    return (
      <a
        ref={ref}
        href={disabled ? undefined : url}
        className={linkClass}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        aria-disabled={disabled}
        {...props}
      >
        <span className="c-footer__social-link-icon">
          {icon || getPlatformIcon(platform)}
        </span>
        <span className="c-footer__social-link-label u-visually-hidden">
          {ariaLabel}
        </span>
      </a>
    );
  }
);

FooterSocialLink.displayName = 'FooterSocialLink';

export default FooterSocialLink;
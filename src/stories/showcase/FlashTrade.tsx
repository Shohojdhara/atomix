import React, { useState } from 'react';
import {
  Accordion,
  AtomixLogo,
  AtomixGlass,
  Avatar,
  Badge,
  Button,
  Card,
  Hero,
  Icon,
  LineChart,
  Modal,
  Progress,
  SectionIntro,
  Steps,
  Tabs,
  Testimonial,
  Navbar,
  NavItem,
  Nav,
  Block,
  Footer,
  FooterSection,
  FooterLink,
  ColorModeToggle,
  Callout,
  Spinner,
  Rating,
  Toggle,
  Tooltip,
  Popover,
  Breadcrumb,
  Pagination,
  ProductReview,
  Upload,
  Input,
  Select,
  Checkbox,
  Radio,
  Textarea,
  Form,
  FormGroup,
  DatePicker,
} from '../../components';
import { Container, Grid, GridCol, Row } from '../../layouts';

const FlashTrade: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('markets');
  const [showAlert, setShowAlert] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [leverage, setLeverage] = useState(10);
  const [notifications, setNotifications] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMarket, setSelectedMarket] = useState('SOL');

  const features = [
    {
      icon: <Icon name="TrendUp" size={24} />,
      title: 'Up to 100x Leverage',
      description:
        'Maximize your trading potential with industry-leading leverage up to 100x on select markets.',
    },
    {
      icon: <Icon name="Lightning" size={24} />,
      title: 'Instant Execution',
      description: 'Trade with lightning-fast execution powered by Solana blockchain technology.',
    },
    {
      icon: <Icon name="ChartLine" size={24} />,
      title: 'Advanced Charts',
      description:
        'Professional TradingView charts with real-time data and comprehensive technical analysis tools.',
    },
    {
      icon: <Icon name="Shield" size={24} />,
      title: 'Secure & Decentralized',
      description: 'Built on Solana with non-custodial trading. Your funds, your control.',
    },
    {
      icon: <Icon name="Coins" size={24} />,
      title: 'Multiple Markets',
      description: 'Trade perpetuals on crypto, commodities, and forex markets all in one place.',
    },
    {
      icon: <Icon name="Gauge" size={24} />,
      title: 'Low Fees',
      description: 'Competitive trading fees with transparent pricing. No hidden costs.',
    },
    {
      icon: <Icon name="ArrowsClockwise" size={24} />,
      title: 'Long & Short',
      description: 'Go long or short on any market. Profit from both rising and falling prices.',
    },
    {
      icon: <Icon name="Wallet" size={24} />,
      title: 'Easy Wallet Connection',
      description: 'Connect with Phantom, Solflare, or any Solana wallet in seconds.',
    },
  ];

  const stats = [
    {
      value: '$500M+',
      label: 'Total Volume',
      description: 'Traded on platform',
    },
    {
      value: '50K+',
      label: 'Active Traders',
      description: 'Growing community',
    },
    {
      value: '25+',
      label: 'Markets',
      description: 'Available to trade',
    },
    {
      value: '99.9%',
      label: 'Uptime',
      description: 'Reliable infrastructure',
    },
  ];

  const markets = [
    { symbol: 'SOL', name: 'Solana', pair: 'SOL/USDC', change: -3.56, price: 156.66 },
    { symbol: 'BTC', name: 'Bitcoin', pair: 'BTC/USDC', change: -2.68, price: 43250.0 },
    { symbol: 'ETH', name: 'Ethereum', pair: 'ETH/USDC', change: -2.85, price: 2650.0 },
    { symbol: 'WIF', name: 'dogwifhat', pair: 'WIF/USDC', change: -1.93, price: 2.45 },
    { symbol: 'BONK', name: 'Bonk', pair: 'BONK/USDC', change: -1.51, price: 0.000012 },
    { symbol: 'JUP', name: 'Jupiter', pair: 'JUP/USDC', change: -4.03, price: 0.85 },
    { symbol: 'PYTH', name: 'Pyth Network', pair: 'PYTH/USDC', change: -3.63, price: 0.42 },
    { symbol: 'JTO', name: 'Jito', pair: 'JTO/USDC', change: -4.47, price: 2.15 },
    { symbol: 'RAY', name: 'Raydium', pair: 'RAY/USDC', change: -5.53, price: 1.85 },
    { symbol: 'ZEC', name: 'Zcash', pair: 'ZEC/USDC', change: 9.35, price: 28.5 },
    { symbol: 'EUR', name: 'Euro', pair: 'EUR/USDC', change: 0.44, price: 1.08 },
    { symbol: 'GBP', name: 'British Pound', pair: 'GBP/USDC', change: 0.63, price: 1.27 },
  ];

  const services = [
    {
      icon: <Icon name="TrendUp" size={32} />,
      title: 'Perpetual Trading',
      description:
        'Trade perpetual futures with up to 100x leverage. No expiration dates, trade as long as you want.',
      features: [
        'Up to 100x leverage',
        'Long and short positions',
        'No expiration',
        'Real-time PnL',
      ],
      cta: 'Start Trading',
    },
    {
      icon: <Icon name="ArrowsLeftRight" size={32} />,
      title: 'Swap',
      description:
        'Swap tokens instantly with the best rates. Powered by Jupiter aggregator for optimal pricing.',
      features: ['Best rates', 'Instant swaps', 'Low slippage', 'Multiple tokens'],
      cta: 'Swap Now',
    },
    {
      icon: <Icon name="ChartPie" size={32} />,
      title: 'Earn',
      description:
        'Earn yield on your assets by providing liquidity or staking. Multiple earning opportunities available.',
      features: ['Liquidity provision', 'Staking rewards', 'Yield farming', 'Auto-compounding'],
      cta: 'Start Earning',
    },
    {
      icon: <Icon name="Coin" size={32} />,
      title: 'Token',
      description:
        'Learn about our native token and ecosystem. Participate in governance and earn rewards.',
      features: ['Governance rights', 'Fee discounts', 'Staking rewards', 'Community voting'],
      cta: 'Learn More',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Professional Trader',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content:
        'The 100x leverage and instant execution make Flash Trade my go-to platform. The UI is clean and the charts are professional-grade.',
    },
    {
      name: 'Sarah Martinez',
      role: 'DeFi Enthusiast',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      content:
        'I love being able to trade multiple markets in one place. The low fees and non-custodial nature give me peace of mind.',
    },
    {
      name: 'Mike Johnson',
      role: 'Crypto Investor',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content:
        'Flash Trade has the best trading experience on Solana. The leverage options and market selection are unmatched.',
    },
  ];

  const faqs = [
    {
      title: 'What is a perpetual contract?',
      content:
        'A perpetual contract is a derivative that allows you to trade an asset without an expiration date. You can hold positions as long as you want, and funding rates are exchanged periodically between long and short positions.',
    },
    {
      title: 'What is the maximum leverage I can use?',
      content:
        'Flash Trade offers up to 100x leverage on select markets. However, higher leverage increases both potential profits and risks. We recommend starting with lower leverage and gradually increasing as you gain experience.',
    },
    {
      title: 'How are fees calculated?',
      content:
        'Trading fees consist of opening and closing fees (typically 0.05% each) and funding fees that are paid/received every hour based on the funding rate. Funding fees are determined by market conditions and are paid by longs to shorts (or vice versa) when the rate is positive.',
    },
    {
      title: 'Is Flash Trade non-custodial?',
      content:
        'Yes! Flash Trade is built on Solana and uses a non-custodial model. You maintain full control of your funds through your connected wallet. We never hold your assets.',
    },
    {
      title: 'What wallets are supported?',
      content:
        'Flash Trade supports all major Solana wallets including Phantom, Solflare, Backpack, and any wallet that supports the Solana Wallet Adapter standard.',
    },
    {
      title: 'What happens if I get liquidated?',
      content:
        'If your position reaches the liquidation price, it will be automatically closed to prevent further losses. The liquidation price depends on your leverage, collateral, and market conditions. Always monitor your positions and use stop-loss orders.',
    },
  ];

  const howItWorksSteps = [
    {
      title: 'Connect Wallet',
      description: 'Connect your Solana wallet (Phantom, Solflare, etc.) to get started.',
      icon: <Icon name="Wallet" size={16} />,
    },
    {
      title: 'Choose Market',
      description: 'Select from 25+ markets including crypto, commodities, and forex.',
      icon: <Icon name="ChartLine" size={16} />,
    },
    {
      title: 'Set Leverage',
      description: 'Choose your leverage from 1x to 100x based on your risk tolerance.',
      icon: <Icon name="Gauge" size={16} />,
    },
    {
      title: 'Open Position',
      description: 'Go long or short and start trading. Monitor your PnL in real-time.',
      icon: <Icon name="TrendUp" size={16} />,
    },
  ];

  // Chart data for trading preview
  const priceData = [
    { label: '00:00', value: 155.2 },
    { label: '04:00', value: 156.8 },
    { label: '08:00', value: 158.1 },
    { label: '12:00', value: 157.5 },
    { label: '16:00', value: 156.3 },
    { label: '20:00', value: 156.6 },
  ];

  return (
    <>
      
      {/* Navigation */}
      <Navbar glass brand={<AtomixLogo />} position="fixed">
        <Nav alignment="start">
          <NavItem href="#markets">Markets</NavItem>
          <NavItem href="#features">Features</NavItem>
          <NavItem href="#how-it-works">How It Works</NavItem>
          <NavItem href="#testimonials">Testimonials</NavItem>
          <NavItem href="#faq">FAQ</NavItem>
        </Nav>
        <Nav alignment="end" className="u-gap-2">
          <Button variant="primary" size="sm" glass>
            Connect Wallet
          </Button>
          <ColorModeToggle />
        </Nav>
      </Navbar>

      {/* Hero Section */}
      <Hero
        className="u-py-60"
        title="Trade Perpetuals on Solana"
        text="Experience the future of decentralized trading with up to 100x leverage, instant execution, and professional-grade charts. Built on Solana for speed and security."
        actions={
          <>
            <Button variant="primary">Start Trading</Button>
            <Button variant="warning" onClick={() => setIsDemoModalOpen(true)}>
              Watch Demo
            </Button>
          </>
        }
        alignment="center"
        contentWidth="1000px"
        backgroundImageSrc="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3873"
        glass={{ padding: '5rem 2rem', cornerRadius: 32, elasticity: 0.1, blurAmount: 2 } as any}
        parallax={true}
      />

      {/* Stats Section */}
      <section className="u-pt-8 u-pb-16">
        <Container>
          <SectionIntro
            title="Trusted by traders worldwide"
            text="Join thousands of traders using Flash Trade for their perpetual trading needs."
            alignment="center"
          />
          <Grid>
            {stats.map((stat, index) => (
              <GridCol key={index} xs={12} sm={6} md={3} className="u-mb-4">
                <Card glass={{  }}>
                  <div className="u-p-4 u-text-center">
                    <div className="u-fs-1 u-fw-bold u-text-primary u-mb-2">{stat.value}</div>
                    <div className="u-fs-5 u-fw-semibold u-mb-1">{stat.label}</div>
                    <div className="u-text-muted u-fs-sm">{stat.description}</div>
                    <Progress 
                      value={75 + index * 5} 
                      variant="primary" 
                      size="sm" 
                      className="u-mt-3" 
                    />
                  </div>
                </Card>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Markets Section */}
      <section
        className="u-pt-8 u-pb-16"
        id="markets"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1823)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <SectionIntro
            title="Trade 25+ Markets"
            text="Access crypto, commodities, and forex markets all in one platform."
            alignment="center"
          />

          <Tabs
            className="u-border u-border-primary"
            style={{
              //   backdropFilter: 'blur(1px)',
              borderRadius: '16px',
              background: `linear-gradient(to top, rgba(var(--atomix-primary-rgb), 0.3), rgba(var(--atomix-warning-rgb), 0.5))`,
            }}
            items={[
              {
                label: 'All Markets',
                content: (
                  <Grid>
                    {markets.map((market, index) => (
                      <GridCol key={index} xs={12} sm={6} md={4} lg={3} className="u-mb-3">
                        <AtomixGlass
                          blurAmount={2}
                          displacementScale={100}
                          mode="polar"
                          cornerRadius={16}
                          saturation={300}
                          elasticity={0}
                          className="u-h-100"
                        >
                          <div className="u-p-3 u-h-100 u-d-flex u-flex-column">
                            <div className="u-d-flex u-align-items-center u-justify-content-between u-mb-2">
                              <div className="u-d-flex u-align-items-center u-gap-2">
                                <div className="u-fs-4 u-fw-bold">{market.symbol}</div>
                              </div>
                              <Badge
                                label={`${market.change >= 0 ? '+' : ''}${market.change.toFixed(2)}%`}
                                variant={market.change >= 0 ? 'success' : 'error'}
                                size="sm"
                              />
                            </div>
                            <div className="u-fs-sm u-text-muted u-mb-1">{market.name}</div>
                            <div className="u-fs-sm u-fw-semibold u-mb-2">{market.pair}</div>
                            <div className="u-fs-5 u-fw-bold u-text-primary">
                              ${market.price.toLocaleString()}
                            </div>
                            <Button variant="primary" size="sm" className="u-mt-auto u-w-100">
                              Trade
                            </Button>
                          </div>
                        </AtomixGlass>
                      </GridCol>
                    ))}
                  </Grid>
                ),
              },
              {
                label: 'Crypto',
                content: (
                  <Grid>
                    {markets
                      .filter(m =>
                        [
                          'SOL',
                          'BTC',
                          'ETH',
                          'WIF',
                          'BONK',
                          'JUP',
                          'PYTH',
                          'JTO',
                          'RAY',
                          'ZEC',
                        ].includes(m.symbol)
                      )
                      .map((market, index) => (
                        <GridCol key={index} xs={12} sm={6} md={4} lg={3} className="u-mb-3">
                          <AtomixGlass
                            blurAmount={0}
                            displacementScale={20}
                            cornerRadius={16}
                            elasticity={0}
                            className="u-h-100"
                          >
                            <div className="u-p-3 u-h-100 u-d-flex u-flex-column">
                              <div className="u-d-flex u-align-items-center u-justify-content-between u-mb-2">
                                <div className="u-fs-4 u-fw-bold">{market.symbol}</div>
                                <Badge
                                  label={`${market.change >= 0 ? '+' : ''}${market.change.toFixed(2)}%`}
                                  variant={market.change >= 0 ? 'success' : 'error'}
                                  size="sm"
                                />
                              </div>
                              <div className="u-fs-sm u-text-muted u-mb-1">{market.name}</div>
                              <div className="u-fs-sm u-fw-semibold u-mb-2">{market.pair}</div>
                              <div className="u-fs-5 u-fw-bold u-text-primary">
                                ${market.price.toLocaleString()}
                              </div>
                              <Button variant="primary" size="sm" className="u-mt-auto u-w-100">
                                Trade
                              </Button>
                            </div>
                          </AtomixGlass>
                        </GridCol>
                      ))}
                  </Grid>
                ),
              },
              {
                label: 'Forex',
                content: (
                  <Grid>
                    {markets
                      .filter(m => ['EUR', 'GBP'].includes(m.symbol))
                      .map((market, index) => (
                        <GridCol key={index} xs={12} sm={6} md={4} lg={3} className="u-mb-3">
                          <AtomixGlass
                            blurAmount={0}
                            displacementScale={20}
                            cornerRadius={16}
                            elasticity={0}
                            className="u-h-100"
                          >
                            <div className="u-p-3 u-h-100 u-d-flex u-flex-column">
                              <div className="u-d-flex u-align-items-center u-justify-content-between u-mb-2">
                                <div className="u-fs-4 u-fw-bold">{market.symbol}</div>
                                <Badge
                                  label={`${market.change >= 0 ? '+' : ''}${market.change.toFixed(2)}%`}
                                  variant={market.change >= 0 ? 'success' : 'error'}
                                  size="sm"
                                />
                              </div>
                              <div className="u-fs-sm u-text-muted u-mb-1">{market.name}</div>
                              <div className="u-fs-sm u-fw-semibold u-mb-2">{market.pair}</div>
                              <div className="u-fs-5 u-fw-bold u-text-primary">
                                ${market.price.toLocaleString()}
                              </div>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="u-mt-auto u-w-100"
                              >
                                Trade
                              </Button>
                            </div>
                          </AtomixGlass>
                        </GridCol>
                      ))}
                  </Grid>
                ),
              },
            ]}
            activeIndex={activeTab === 'markets' ? 0 : activeTab === 'crypto' ? 1 : 2}
            onTabChange={index => {
              const tabs = ['markets', 'crypto', 'forex'];
              setActiveTab(tabs[index] || 'markets');
            }}
          />
        </Container>
      </section>

      {/* Features Section */}
      <section className="u-pt-8 u-pb-16" id="features">
        <Container>
          <SectionIntro
            title="Powerful trading features"
            text="Everything you need for professional-grade perpetual trading on Solana."
            alignment="center"
          />
          <Grid>
            {features.map((feature, index) => (
              <GridCol key={index} xs={12} sm={6} md={4} className="u-mb-4">
                <AtomixGlass
                  blurAmount={4}
                  displacementScale={10}
                  cornerRadius={32}
                  elasticity={0}
                  className="u-h-100"
                >
                  <div className="u-p-4 u-h-100 u-d-flex u-flex-column">
                    <div className="u-mb-3 u-text-primary">{feature.icon}</div>
                    <h3 className="u-fs-5 u-fw-bold u-mb-2">{feature.title}</h3>
                    <p className="u-text-muted u-mb-0 u-flex-grow-1">{feature.description}</p>
                  </div>
                </AtomixGlass>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Services Section */}
      <section
        className="u-pt-8 u-pb-16"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <SectionIntro
            title="Complete DeFi trading suite"
            text="Trade, swap, earn, and participate in governance all in one platform."
            alignment="center"
          />
          <Grid>
            {services.map((service, index) => (
              <GridCol key={index} xs={12} md={6} className="u-mb-4">
                <AtomixGlass
                  blurAmount={4}
                  displacementScale={10}
                  cornerRadius={32}
                  elasticity={0}
                  className="u-h-100"
                >
                  <div className="u-p-4 u-h-100 u-d-flex u-flex-column">
                    <div className="u-mb-3 u-text-primary">{service.icon}</div>
                    <h3 className="u-fs-4 u-fw-bold u-mb-2">{service.title}</h3>
                    <p className="u-text-muted u-mb-3">{service.description}</p>
                    <ul className="c-list u-mb-3 u-flex-grow-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="c-list__item">
                          <Icon name="Check" className="u-text-success u-me-2" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="u-d-flex u-justify-content-center">
                      <Button variant="outline-primary">{service.cta}</Button>
                    </div>
                  </div>
                </AtomixGlass>
              </GridCol>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Trading Preview Section */}
      <section
        className="u-pt-8 u-pb-16"
        style={{
          background: `url(https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2728), linear-gradient(to top, rgba(var(--atomix-primary-rgb), 0.2), rgba(var(--atomix-warning-rgb), 0.2))`,
          backgroundBlendMode: 'soft-light',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <SectionIntro
            title="Professional trading interface"
            text="Experience our advanced trading platform with real-time charts and comprehensive order management."
            alignment="center"
          />
          <Grid>
            <GridCol xs={12} lg={8}>
              <AtomixGlass
                blurAmount={4}
                displacementScale={100}
                elasticity={0}
                className="u-mb-4"
              >
                <div className="u-p-4">
                  <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-4">
                    <div>
                      <h3 className="u-fs-4 u-fw-bold u-mb-1">SOL/USDC</h3>
                      <div className="u-fs-1 u-fw-bold u-text-primary-emphasis">$156.66</div>
                      <Badge label="-3.56%" variant="error" size="sm" className="u-mt-2" />
                    </div>
                    <div className="u-text-end">
                      <div className="u-fs-sm u-text-secondary-emphasis  u-mb-1">24h High</div>
                      <div className="u-fs-5 u-fw-semibold u-text-primary-emphasis">$162.89</div>
                      <div className="u-fs-sm u-text-secondary-emphasis u-mt-2 u-mb-1">24h Low</div>
                      <div className="u-fs-5 u-fw-semibold u-text-primary-emphasis">$153.79</div>
                    </div>
                  </div>
                  <LineChart
                    title={(
                      <>
                        <div className="u-d-flex u-align-items-center u-gap-2">
                          <Icon name="ChartLine" size={24} />
                          <h3 className="u-fs-4 u-fw-bold u-mb-1">Price Chart</h3>
                        </div>
                      </>
                    ) as any}
                    glass={
                      {
                        blurAmount: 1,
                        displacementScale: 200,
                        mode: 'prominent',
                      } as any
                    }
                    datasets={[
                      {
                        label: 'Price',
                        data: priceData,
                        color: '#7AFFD7',
                      },
                    ]}
                    config={{
                      showLegend: false,
                      showTooltips: true,
                      animate: true,
                    }}
                  />
                  <div className="u-d-flex u-gap-2 u-mt-4 u-flex-wrap">
                    <Badge label="Leverage: Up to 100x" variant="primary" />
                    <Badge label="Long/Short" variant="secondary" />
                    <Badge label="Real-time PnL" variant="success" />
                    <Badge label="Stop Loss / Take Profit" variant="info" />
                  </div>
                </div>
              </AtomixGlass>
            </GridCol>
            <GridCol xs={12} lg={4}>
              <Card glass={{ blurAmount: 4, displacementScale: 10,}} className="u-mb-4 u-bg-transparent "> 
                <div className="u-p-4">
                  <h4 className="u-fs-5 u-fw-bold u-mb-3">Quick Trade</h4>
                  <Form>
                    <FormGroup label="Market">
                      <Select
                        value={selectedMarket}
                        onChange={(e) => setSelectedMarket(e.target.value)}
                        options={[
                          { value: 'SOL', label: 'SOL/USDC' },
                          { value: 'BTC', label: 'BTC/USDC' },
                          { value: 'ETH', label: 'ETH/USDC' },
                        ]}
                      />
                    </FormGroup>
                    <FormGroup label='Amount (USDC)'>
                      <Input
                        type="number"
                        placeholder="100"
                      />
                    </FormGroup>
                    <FormGroup>
                      <label className="u-fs-sm u-fw-semibold u-mb-2 u-d-block">
                        Leverage: {leverage}x
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={100}
                        value={leverage}
                        onChange={(e) => setLeverage(Number(e.target.value))}
                        className="u-mb-2"
                      />
                    </FormGroup>
                    <div className="u-d-flex u-gap-2 u-justify-content-center">
                      <Button variant="success" glass className="u-flex-grow-1" disabled={isLoading}>
                        {isLoading ? <Spinner size="sm" /> : 'Long'}
                      </Button>
                      <Button variant="error" glass className="u-flex-grow-1" disabled={isLoading}>
                        {isLoading ? <Spinner size="sm" /> : 'Short'}
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card>
              
              <Card glass={{  }} className="u-mb-4 u-bg-transparent ">
                  <h4 className="u-fs-5 u-fw-bold u-mb-3">Settings</h4>
                  <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-3">
                    <span className="u-fs-sm">Notifications</span>
                    <Toggle
                      initialOn={notifications}
                      onToggleOn={() => setNotifications(true)}
                      onToggleOff={() => setNotifications(false)}
                    />
                  </div>
                  <Callout
                    variant="warning"
                    title="Risk Warning"
                  >
                    Trading with leverage involves significant risk. Only trade with funds you can afford to lose.
                  </Callout>
              </Card>
            </GridCol>
          </Grid>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="u-pt-8 u-pb-16" id="how-it-works">
        <Container>
          <SectionIntro
            title="Get started in 4 simple steps"
            text="Start trading perpetuals in minutes. No KYC required, just connect your wallet and begin."
            alignment="center"
          />
          <Steps
            items={howItWorksSteps.map((step, index) => ({
              number: step.icon,
              text: `${step.title}: ${step.description}`,
            }))}
            activeIndex={3}
            className="u-mt-6"
            glass={
              {
                elasticity: 0,
                blurAmount: 4,
                displacementScale: 10,
                cornerRadius: 32,
                padding: '4rem',
              } as any
            }
          />
        </Container>
      </section>

      {/* Reviews Section */}
      <Block
        spacing="lg"
        background="light"
        id="testimonials"
        style={
          {
            backgroundImage: `url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          } as any
        }
      >
        <Container>
          <SectionIntro
            title="What traders are saying"
            text="Join thousands of satisfied traders using Flash Trade for their perpetual trading needs."
            alignment="center"
          />
          <Grid>
            {testimonials.map((testimonial, index) => (
              <GridCol key={index} xs={12} md={4} className="u-mb-4">
                <ProductReview
                  productName="Flash Trade Platform"
                  initialRating={5}
                  maxRating={5}
                  allowHalf={false}
                  ratingColor="warning"
                />
              </GridCol>
            ))}
          </Grid>
          
          <div className="u-text-center u-mt-6">
            <div className="u-d-flex u-justify-content-center u-align-items-center u-gap-3 u-mb-4">
              <Rating value={4.8} size="lg" readOnly />
              <div>
                <div className="u-fs-4 u-fw-bold">4.8/5</div>
                <div className="u-fs-sm u-text-muted">Based on 2,847 reviews</div>
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
            />
          </div>
        </Container>
      </Block>

      {/* FAQ Section */}
      <section className="u-pt-8 u-pb-16" id="faq">
        <Container>
          <SectionIntro
            title="Frequently asked questions"
            text="Find answers to common questions about trading, fees, leverage, and more."
            alignment="center"
          />
          <div className="u-mt-6" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <AtomixGlass
              blurAmount={2}
              displacementScale={10}
              saturation={160}
              cornerRadius={16}
              elasticity={0}
              mode="standard"
            >
              <div className="u-p-4">
                {faqs.map((faq, index) => (
                  <Accordion
                    key={index}
                    title={faq.title}
                    defaultOpen={index === 0}
                    className={index < faqs.length - 1 ? 'u-mb-3' : ''}
                  >
                    <p>{faq.content}</p>
                  </Accordion>
                ))}
              </div>
            </AtomixGlass>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="u-py-20">
        <Container type="md">
          <Row className="u-text-center">
            <GridCol xs={12}>
              <AtomixGlass
                blurAmount={2}
                displacementScale={100}
                saturation={170}
                cornerRadius={32}
                elasticity={0}
              >
                <div className="u-p-6">
                  <h2 className="u-fs-2 u-fw-bold u-mb-3">Ready to start trading?</h2>
                  <p className="u-fs-5 u-mb-4 u-text-primary-emphasis">
                    Join thousands of traders and experience the future of decentralized perpetual
                    trading.
                  </p>
                  <div className="u-d-flex u-gap-2 u-justify-content-center">
                    <Button variant="primary" glass>
                      Connect Wallet
                    </Button>
                    <Button
                      variant="secondary-outline"
                      glass
                      onClick={() => setIsDemoModalOpen(true)}
                    >
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </AtomixGlass>
            </GridCol>
          </Row>
        </Container>
      </section>

      {/* Demo Modal */}
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Trading Platform Demo"
        size="lg"
      >
        <div className="u-p-4">
          <div className="u-text-center u-mb-4">
            <Icon name="PlayCircle" size={64} className="u-text-primary u-mb-3" />
            <h3 className="u-fs-4 u-fw-bold u-mb-2">Interactive Platform Demo</h3>
            <p className="u-text-muted u-mb-4">
              Experience the full trading interface, chart tools, and order management features.
            </p>
          </div>
          
          <div className="u-mb-4">
            <Breadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Demo', href: '#' },
                { label: 'Trading Platform' },
              ]}
            />
          </div>
          
          <Callout
            variant="info"
            title="Demo Mode"
            className="u-mb-4"
          >
            This is a simulated trading environment. No real funds are at risk.
          </Callout>
          
          <div className="u-mb-4">
            <h4 className="u-fs-5 u-fw-bold u-mb-3">Demo Features</h4>
            <div className="u-d-flex u-flex-column u-gap-2">
              <div className="u-d-flex u-align-items-center u-gap-2">
                <Checkbox checked disabled />
                <span className="u-fs-sm">Real-time price feeds</span>
              </div>
              <div className="u-d-flex u-align-items-center u-gap-2">
                <Checkbox checked disabled />
                <span className="u-fs-sm">Advanced charting tools</span>
              </div>
              <div className="u-d-flex u-align-items-center u-gap-2">
                <Checkbox checked disabled />
                <span className="u-fs-sm">Order management system</span>
              </div>
              <div className="u-d-flex u-align-items-center u-gap-2">
                <Checkbox checked disabled />
                <span className="u-fs-sm">Portfolio tracking</span>
              </div>
            </div>
          </div>
          
          <div className="u-text-center">
            <div className="u-d-flex u-gap-2 u-justify-content-center">
              <Button variant="primary" onClick={() => setIsDemoModalOpen(false)}>
                Start Demo
              </Button>
              <Button variant="secondary" onClick={() => setIsDemoModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Footer */}
      <Footer
        variant="dark"
        layout="columns"
        brand="Flash Trade"
        glass={{ blurAmount: 1, displacementScale: 0.005, elasticity: 0 } as any}
        brandDescription="Flash Trade is a decentralized perpetuals trading protocol built on Solana, offering up to 100x leverage and professional trading tools."
        socialLinks={[
          { platform: 'twitter', url: 'https://twitter.com/flashtrade' },
          { platform: 'discord', url: 'https://discord.gg/flashtrade' },
          { platform: 'telegram', url: 'https://t.me/flashtrade' },
          { platform: 'github', url: 'https://github.com/flashtrade' },
        ]}
        showBackToTop={true}
        backToTopText="Back to Top"
        copyright="© 2024 Flash Trade. All rights reserved."
        newsletterTitle="Stay Updated"
        newsletterDescription="Subscribe to our newsletter for trading tips and platform updates."
        onNewsletterSubmit={email => console.log('Newsletter signup:', email)}
        newsletterPlaceholder="Enter your email"
        newsletterButtonText="Subscribe"
        showNewsletter={true}
        style={{
          background: `var(--atomix-success-gradient), url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'soft-light',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <FooterSection title="Trading" icon={<Icon name="ChartLine" size={24} />}>
          <FooterLink href="#markets">Markets</FooterLink>
          <FooterLink href="#features">Features</FooterLink>
          <FooterLink href="#how-it-works">How It Works</FooterLink>
          <FooterLink href="#faq">FAQ</FooterLink>
        </FooterSection>
        <FooterSection title="Resources" icon={<Icon name="Book" size={24} />}>
          <FooterLink href="#documentation">Documentation</FooterLink>
          <FooterLink href="#blog">Blog</FooterLink>
          <FooterLink href="#support">Support</FooterLink>
          <FooterLink href="#api">API</FooterLink>
        </FooterSection>
        <FooterSection title="Company" icon={<Icon name="Building" size={24} />}>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#careers">Careers</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterSection>
      </Footer>

      {/* Alert Banner */}
      {showAlert && (
           <Callout  
        glass
          variant="info"
          title="🎉 New Feature Alert!"
          onClose={() => setShowAlert(false)}
          style={{
            position: 'fixed',
            bottom  : 0,
            right: 0,
            left: 0
          }}
        >
          Introducing copy trading - follow top traders and mirror their strategies automatically.
        </Callout>
       
      )}

    </>
  );
};

export default FlashTrade;

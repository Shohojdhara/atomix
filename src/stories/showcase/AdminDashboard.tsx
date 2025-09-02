import React, { useEffect, useMemo, useState } from 'react';
import { Badge } from '../../components/Badge/Badge';
import { Block } from '../../components/Block/Block';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { Button } from '../../components/Button/Button';
import { Callout } from '../../components/Callout/Callout';
import { Card } from '../../components/Card/Card';
import { BarChart, DonutChart, GaugeChart, LineChart, PieChart } from '../../components/Chart';
import ColorModeToggle from '../../components/ColorModeToggle/ColorModeToggle';
import { DataTable } from '../../components/DataTable/DataTable';
import { Icon } from '../../components/Icon/Icon';
import { Modal } from '../../components/Modal/Modal';
import { Menu, MenuItem } from '../../components/Navigation/Menu/Menu';
import { Nav } from '../../components/Navigation/Nav/Nav';
import { NavDropdown } from '../../components/Navigation/Nav/NavDropdown';
import { Navbar } from '../../components/Navigation/Navbar/Navbar';
import { SideMenu } from '../../components/Navigation/SideMenu/SideMenu';
import { SideMenuItem } from '../../components/Navigation/SideMenu/SideMenuItem';
import { SideMenuList } from '../../components/Navigation/SideMenu/SideMenuList';
import { Progress } from '../../components/Progress/Progress';
import { Toggle } from '../../components/Toggle/Toggle';
import { Form, FormGroup, Input, Select } from '../../index';
import { Grid } from '../../layouts/Grid/Grid';
import GridCol from '../../layouts/Grid/GridCol';

// Types for our admin dashboard
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended';
  lastLogin: string;
  createdAt: string;
}

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

// Sample data for the dashboard
const generateUsers = (count: number): User[] => {
  const roles = ['Admin', 'User', 'Editor', 'Manager'];
  const statuses: User['status'][] = ['Active', 'Inactive', 'Pending', 'Suspended'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)] as string,
    status: statuses[Math.floor(Math.random() * statuses.length)] as User['status'],
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    createdAt: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  }));
};

const sampleUsers = generateUsers(50);

const dashboardStats: DashboardStats = {
  totalUsers: 1234,
  activeUsers: 987,
  revenue: 45678,
  growth: 12.5,
};

// Chart data in Atomix format - using datasets structure
const trafficDatasets = [
  {
    label: 'Users',
    data: [
      { label: 'Jan', value: 100 },
      { label: 'Feb', value: 150 },
      { label: 'Mar', value: 200 },
      { label: 'Apr', value: 180 },
      { label: 'May', value: 220 },
      { label: 'Jun', value: 250 },
    ],
    color: '#7AFFD7',
  },
];

const revenueDatasets = [
  {
    label: 'Revenue',
    data: [
      { label: 'Q1', value: 12000 },
      { label: 'Q2', value: 15000 },
      { label: 'Q3', value: 18000 },
      { label: 'Q4', value: 22000 },
    ],
    color: '#1AFFD2',
  },
];

const userDistributionDatasets = [
  {
    label: 'User Distribution',
    data: [
      { label: 'Admin', value: 15 },
      { label: 'User', value: 65 },
      { label: 'Editor', value: 15 },
      { label: 'Manager', value: 5 },
    ],
    color: '#7AFFD7',
  },
];

export const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: '', status: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Interactive dashboard state
  const [selectedTimeRange, setSelectedTimeRange] = useState('30D');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);
  const [quickActionLoading, setQuickActionLoading] = useState<string | null>(null);

  // Real-time data state
  const [liveStats, setLiveStats] = useState({
    totalUsers: dashboardStats.totalUsers,
    activeUsers: dashboardStats.activeUsers,
    revenue: dashboardStats.revenue,
    orders: 247,
    uptime: 98.5,
    rating: 4.8,
    tickets: 23,
  });

  const [liveTrafficData, setLiveTrafficData] = useState(trafficDatasets);

  // Additional chart data
  const performanceData = [
    { label: 'CPU Usage', value: 65 },
    { label: 'Memory Usage', value: 78 },
    { label: 'Disk Usage', value: 45 },
    { label: 'Network', value: 32 },
  ];

  const conversionData = [
    { label: 'Visitors', value: 12500 },
    { label: 'Sign-ups', value: 1250 },
    { label: 'Purchases', value: 375 },
    { label: 'Revenue', value: 18750 },
  ];

  const deviceData = [
    { label: 'Desktop', value: 45 },
    { label: 'Mobile', value: 35 },
    { label: 'Tablet', value: 20 },
  ];

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return sampleUsers.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  // DataTable columns
  const userColumns = [
    { key: 'id', title: 'ID', sortable: true, width: '80px' },
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    {
      key: 'role',
      title: 'Role',
      sortable: true,
      render: (value: string) => (
        <Badge
          variant={value === 'Admin' ? 'primary' : value === 'Manager' ? 'success' : 'secondary'}
          size="sm"
          label={value}
        />
      ),
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: User['status']) => (
        <Badge
          variant={
            value === 'Active'
              ? 'success'
              : value === 'Inactive'
                ? 'error'
                : value === 'Pending'
                  ? 'warning'
                  : 'secondary'
          }
          size="sm"
          label={value}
        />
      ),
    },
    { key: 'lastLogin', title: 'Last Login', sortable: true },
    {
      key: 'actions',
      title: 'Actions',
      render: (value: any, row: User) => (
        <div className="u-d-flex u-gap-2">
          <Button size="sm" variant="primary" onClick={() => handleEditUser(row)}>
            Edit
          </Button>
          <Button size="sm" variant="error" onClick={() => handleDeleteUser(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' },
    { value: 'Editor', label: 'Editor' },
    { value: 'Manager', label: 'Manager' },
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Suspended', label: 'Suspended' },
  ];

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsEditUserModalOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    // In a real app, this would make an API call
    console.log('Delete user:', userId);
  };

  const handleUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // In a real app, this would make an API call
    console.log('User form submitted:', Object.fromEntries(formData));
    setIsAddUserModalOpen(false);
    setIsEditUserModalOpen(false);
    setSelectedUser(null);
  };

  // Interactive dashboard functions
  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range);
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleQuickAction = async (action: string) => {
    setQuickActionLoading(action);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setQuickActionLoading(null);
    // Show success feedback
    console.log(`${action} completed successfully`);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setNotificationCount(0);
  };

  // Real-time data update functions
  const updateLiveStats = () => {
    setLiveStats(prev => ({
      ...prev,
      totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
      activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
      revenue: prev.revenue + Math.floor(Math.random() * 1000),
      orders: prev.orders + Math.floor(Math.random() * 2),
      uptime: Math.max(95, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.2)),
      rating: Math.max(4.0, Math.min(5.0, prev.rating + (Math.random() - 0.5) * 0.1)),
      tickets: prev.tickets + Math.floor(Math.random() * 2) - 1,
    }));
  };

  const updateTrafficData = () => {
    setLiveTrafficData(prev =>
      prev.map(dataset => ({
        ...dataset,
        data: dataset.data.map(point => ({
          ...point,
          value: point.value + Math.floor(Math.random() * 50) - 25,
        })),
      }))
    );
  };

  // Set up real-time updates
  useEffect(() => {
    const statsInterval = setInterval(updateLiveStats, 10000); // Update every 10 seconds
    const trafficInterval = setInterval(updateTrafficData, 15000); // Update every 15 seconds

    return () => {
      clearInterval(statsInterval);
      clearInterval(trafficInterval);
    };
  }, []);

  const renderDashboardView = () => (
    <Grid>

      {/* Enhanced Stats Cards Row */}
      <GridCol xs={12} sm={6} md={3}>
        <Card className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-justify-content-between u-align-items-start">
              <div>
                <div className="u-fs-1 u-fw-bold u-text-brand-emphasis u-mb-1">
                  {liveStats.totalUsers.toLocaleString()}
                </div>
                <div className="u-text-secondary-emphasis u-fs-6">Total Users</div>
              </div>
              <div className="u-bg-primary u-rounded u-p-2">
                <Icon name="Users" size="sm" className="u-text-light" />
              </div>
            </div>
            <div className="u-d-flex u-align-items-center u-mt-2">
              <Badge variant="success" size="sm" label={`+${dashboardStats.growth}%`} />
              <span className="u-text-secondary-emphasis u-fs-6 u-ms-2">vs last month</span>
            </div>
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} sm={6} md={3}>
        <Card className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-justify-content-between u-align-items-start">
              <div>
                <div className="u-fs-1 u-fw-bold u-text-success-emphasis u-mb-1">
                  {liveStats.activeUsers.toLocaleString()}
                </div>
                <div className="u-text-secondary-emphasis u-fs-6">Active Users</div>
              </div>
              <div className="u-bg-success u-rounded u-p-2">
                <Icon name="TrendUp" size="sm" className="u-text-light" />
              </div>
            </div>
            <div className="u-d-flex u-align-items-center u-mt-2">
              <Badge variant="success" size="sm" label="+8%" />
              <span className="u-text-secondary-emphasis u-fs-6 u-ms-2">vs last month</span>
            </div>
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} sm={6} md={3}>
        <Card className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-justify-content-between u-align-items-start">
              <div>
                <div className="u-fs-1 u-fw-bold u-text-brand-emphasis u-mb-1">
                  ${liveStats.revenue.toLocaleString()}
                </div>
                <div className="u-text-secondary-emphasis u-fs-6">Total Revenue</div>
              </div>
              <div className="u-bg-primary u-rounded u-p-2">
                <Icon name="CurrencyDollar" size="sm" className="u-text-light" />
              </div>
            </div>
            <div className="u-d-flex u-align-items-center u-mt-2">
              <Badge variant="success" size="sm" label="+15%" />
              <span className="u-text-secondary-emphasis u-fs-6 u-ms-2">vs last month</span>
            </div>
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} sm={6} md={3}>
        <Card className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-justify-content-between u-align-items-start">
              <div>
                <div className="u-fs-1 u-fw-bold u-text-warning u-mb-1">85%</div>
                <div className="u-text-secondary-emphasis u-fs-6">System Performance</div>
              </div>
              <div className="u-bg-warning u-rounded u-p-2">
                <Icon name="Gauge" size="sm" className="u-text-light" />
              </div>
            </div>
            <div className="u-mt-2">
              <Progress value={85} variant="warning" size="sm" />
            </div>
          </div>
        </Card>
      </GridCol>

      {/* Key Metrics Row */}
      <GridCol xs={12} sm={6} md={3}>
        <Card className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-justify-content-between u-align-items-center">
              <div>
                <div className="u-fs-2 u-fw-bold u-text-info">{liveStats.orders}</div>
                <div className="u-text-secondary-emphasis u-fs-6">Orders Today</div>
              </div>
              <Icon name="ShoppingCart" size="md" className="u-text-info" />
            </div>
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} sm={6} md={3}>
        <Card className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-justify-content-between u-align-items-center">
              <div>
                <div className="u-fs-2 u-fw-bold u-text-success-emphasis">
                  {liveStats.uptime.toFixed(1)}%
                </div>
                <div className="u-text-secondary-emphasis u-fs-6">Uptime</div>
              </div>
              <Icon name="CheckCircle" size="md" className="u-text-success-emphasis" />
            </div>
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} sm={6} md={3}>
        <Card className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-justify-content-between u-align-items-center">
              <div>
                <div className="u-fs-2 u-fw-bold u-text-brand-emphasis">
                  {liveStats.rating.toFixed(1)}
                </div>
                <div className="u-text-secondary-emphasis u-fs-6">Avg Rating</div>
              </div>
              <Icon name="Star" size="md" className="u-text-brand-emphasis" />
            </div>
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} sm={6} md={3}>
        <Card className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-justify-content-between u-align-items-center">
              <div>
                <div className="u-fs-2 u-fw-bold u-text-error">{liveStats.tickets}</div>
                <div className="u-text-secondary-emphasis u-fs-6">Support Tickets</div>
              </div>
              <Icon name="Question" size="md" className="u-text-error" />
            </div>
          </div>
        </Card>
      </GridCol>

      {/* Main Dashboard Charts */}
      <GridCol xs={12} md={8}>
        <Card className="u-mb-3">
          <div className="u-d-flex u-justify-content-between u-align-items-center u-p-3 u-border-b">
            <div>
              <h4 className="u-fw-medium u-mb-1">Traffic Overview</h4>
              <p className="u-text-secondary-emphasis u-fs-6 u-mb-0">User visits and page views</p>
            </div>
            <div className="u-d-flex u-gap-2">
              <Button
                size="sm"
                variant={selectedTimeRange === '7D' ? 'primary' : 'secondary'}
                onClick={() => handleTimeRangeChange('7D')}
                disabled={isRefreshing}
              >
                7D
              </Button>
              <Button
                size="sm"
                variant={selectedTimeRange === '30D' ? 'primary' : 'secondary'}
                onClick={() => handleTimeRangeChange('30D')}
                disabled={isRefreshing}
              >
                30D
              </Button>
              <Button
                size="sm"
                variant={selectedTimeRange === '90D' ? 'primary' : 'secondary'}
                onClick={() => handleTimeRangeChange('90D')}
                disabled={isRefreshing}
              >
                90D
              </Button>
            </div>
          </div>
          <div className="u-p-3">
            <LineChart datasets={liveTrafficData} size="lg" />
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} md={4}>
        <Card title="User Distribution" className="u-mb-3">
          <div className="u-p-3">
            <DonutChart datasets={userDistributionDatasets} size="md" />
            <div className="u-mt-3">
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <div className="u-d-flex u-align-items-center">
                  <div className="u-w-3 u-h-3 u-bg-primary u-rounded u-me-2"></div>
                  <span className="u-fs-6">Admin</span>
                </div>
                <span className="u-fw-medium">15%</span>
              </div>
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <div className="u-d-flex u-align-items-center">
                  <div className="u-w-3 u-h-3 u-bg-success u-rounded u-me-2"></div>
                  <span className="u-fs-6">Users</span>
                </div>
                <span className="u-fw-medium">65%</span>
              </div>
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <div className="u-d-flex u-align-items-center">
                  <div className="u-w-3 u-h-3 u-bg-info u-rounded u-me-2"></div>
                  <span className="u-fs-6">Editor</span>
                </div>
                <span className="u-fw-medium">15%</span>
              </div>
              <div className="u-d-flex u-justify-content-between u-align-items-center">
                <div className="u-d-flex u-align-items-center">
                  <div className="u-w-3 u-h-3 u-bg-warning u-rounded u-me-2"></div>
                  <span className="u-fs-6">Manager</span>
                </div>
                <span className="u-fw-medium">5%</span>
              </div>
            </div>
          </div>
        </Card>
      </GridCol>

      {/* Revenue and Goals */}
      <GridCol xs={12} md={6}>
        <Card title="Revenue Analytics" className="u-mb-3">
          <div className="u-p-3">
            <BarChart datasets={revenueDatasets} size="md" />
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} md={6}>
        <Card title="Monthly Goals" className="u-mb-3">
          <div className="u-p-3">
            <div className="u-mb-4">
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span className="u-fw-medium">Sales Target</span>
                <span className="u-fw-bold u-text-brand-emphasis">$45K / $50K</span>
              </div>
              <Progress value={90} variant="primary" size="md" />
              <div className="u-text-secondary-emphasis u-fs-6 u-mt-1">90% completed</div>
            </div>

            <div className="u-mb-4">
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span className="u-fw-medium">User Acquisition</span>
                <span className="u-fw-bold u-text-success-emphasis">850 / 1000</span>
              </div>
              <Progress value={85} variant="success" size="md" />
              <div className="u-text-secondary-emphasis u-fs-6 u-mt-1">85% completed</div>
            </div>

            <div className="u-mb-4">
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span className="u-fw-medium">Customer Satisfaction</span>
                <span className="u-fw-bold u-text-warning">4.2 / 5.0</span>
              </div>
              <Progress value={84} variant="warning" size="md" />
              <div className="u-text-secondary-emphasis u-fs-6 u-mt-1">84% completed</div>
            </div>

            <div>
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span className="u-fw-medium">Product Development</span>
                <span className="u-fw-bold u-text-info">7 / 10</span>
              </div>
              <Progress value={70} variant="info" size="md" />
              <div className="u-text-secondary-emphasis u-fs-6 u-mt-1">70% completed</div>
            </div>
          </div>
        </Card>
      </GridCol>

      {/* Recent Activity Enhanced */}
      <GridCol xs={12} md={6}>
        <Card className="u-mb-3">
          <div className="u-d-flex u-justify-content-between u-align-items-center u-p-3 u-border-b">
            <h4 className="u-fw-medium u-mb-0">Recent Activity</h4>
            <Button size="sm" variant="outline-primary">
              View All
            </Button>
          </div>
          <div className="u-p-3">
            <div className="u-d-flex u-align-items-start u-mb-3">
              <div className="u-bg-success u-rounded-circle u-p-2 u-me-3">
                <Icon name="User" size="sm" className="u-text-light" />
              </div>
              <div className="u-flex-fill">
                <div className="u-fw-medium u-mb-1">New user registered</div>
                <div className="u-text-secondary-emphasis u-fs-6">John Doe joined the platform</div>
                <div className="u-text-secondary-emphasis u-fs-6">2 minutes ago</div>
              </div>
              <Badge variant="success" size="sm" label="New" />
            </div>

            <div className="u-d-flex u-align-items-start u-mb-3">
              <div className="u-bg-primary u-rounded-circle u-p-2 u-me-3">
                <Icon name="CreditCard" size="sm" className="u-text-light" />
              </div>
              <div className="u-flex-fill">
                <div className="u-fw-medium u-mb-1">Payment processed</div>
                <div className="u-text-secondary-emphasis u-fs-6">$249.99 from Jane Smith</div>
                <div className="u-text-secondary-emphasis u-fs-6">5 minutes ago</div>
              </div>
              <Badge variant="primary" size="sm" label="$249" />
            </div>

            <div className="u-d-flex u-align-items-start u-mb-3">
              <div className="u-bg-info u-rounded-circle u-p-2 u-me-3">
                <Icon name="Bell" size="sm" className="u-text-light" />
              </div>
              <div className="u-flex-fill">
                <div className="u-fw-medium u-mb-1">System alert resolved</div>
                <div className="u-text-secondary-emphasis u-fs-6">Database connection restored</div>
                <div className="u-text-secondary-emphasis u-fs-6">10 minutes ago</div>
              </div>
              <Badge variant="info" size="sm" label="Fixed" />
            </div>

            <div className="u-d-flex u-align-items-start">
              <div className="u-bg-warning u-rounded-circle u-p-2 u-me-3">
                <Icon name="ShoppingCart" size="sm" className="u-text-light" />
              </div>
              <div className="u-flex-fill">
                <div className="u-fw-medium u-mb-1">Large order placed</div>
                <div className="u-text-secondary-emphasis u-fs-6">
                  Enterprise client - 50 licenses
                </div>
                <div className="u-text-secondary-emphasis u-fs-6">15 minutes ago</div>
              </div>
              <Badge variant="warning" size="sm" label="Large" />
            </div>
          </div>
        </Card>
      </GridCol>

      {/* Top Products/Features */}
      <GridCol xs={12} md={6}>
        <Card title="Top Performing Features" className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-3 u-pb-2 u-border-b">
              <div className="u-d-flex u-align-items-center">
                <Icon name="ChartBar" size="sm" className="u-me-2 u-text-brand-emphasis" />
                <span className="u-fw-medium">Analytics Dashboard</span>
              </div>
              <div className="u-text-end">
                <div className="u-fw-bold u-text-brand-emphasis">12.5K</div>
                <div className="u-text-secondary-emphasis u-fs-6">views</div>
              </div>
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-3 u-pb-2 u-border-b">
              <div className="u-d-flex u-align-items-center">
                <Icon name="Users" size="sm" className="u-me-2 u-text-success-emphasis" />
                <span className="u-fw-medium">User Management</span>
              </div>
              <div className="u-text-end">
                <div className="u-fw-bold u-text-success-emphasis">8.2K</div>
                <div className="u-text-secondary-emphasis u-fs-6">views</div>
              </div>
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-3 u-pb-2 u-border-b">
              <div className="u-d-flex u-align-items-center">
                <Icon name="FileText" size="sm" className="u-me-2 u-text-info" />
                <span className="u-fw-medium">Reports Generator</span>
              </div>
              <div className="u-text-end">
                <div className="u-fw-bold u-text-info">6.8K</div>
                <div className="u-text-secondary-emphasis u-fs-6">views</div>
              </div>
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-3 u-pb-2 u-border-b">
              <div className="u-d-flex u-align-items-center">
                <Icon name="Gear" size="sm" className="u-me-2 u-text-warning" />
                <span className="u-fw-medium">Settings Panel</span>
              </div>
              <div className="u-text-end">
                <div className="u-fw-bold u-text-warning">4.1K</div>
                <div className="u-text-secondary-emphasis u-fs-6">views</div>
              </div>
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center">
              <div className="u-d-flex u-align-items-center">
                <Icon name="Shield" size="sm" className="u-me-2 u-text-error" />
                <span className="u-fw-medium">Security Center</span>
              </div>
              <div className="u-text-end">
                <div className="u-fw-bold u-text-error">2.9K</div>
                <div className="u-text-secondary-emphasis u-fs-6">views</div>
              </div>
            </div>
          </div>
        </Card>
      </GridCol>

      {/* Additional Charts Section */}
      <GridCol xs={12}>
        <h3 className="u-fs-3 u-fw-medium u-mb-3">System Performance & Analytics</h3>
      </GridCol>

      <GridCol xs={12} md={6}>
        <Card title="System Performance" className="u-mb-3">
          <div className="u-p-3">
            <BarChart
              datasets={[
                {
                  label: 'Performance Metrics',
                  data: performanceData,
                  color: '#7AFFD7',
                },
              ]}
              size="md"
            />
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} md={6}>
        <Card title="Conversion Funnel" className="u-mb-3">
          <div className="u-p-3">
            <BarChart
              datasets={[
                {
                  label: 'Conversion Data',
                  data: conversionData,
                  color: '#1AFFD2',
                },
              ]}
              size="md"
            />
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} md={4}>
        <Card title="Device Distribution" className="u-mb-3">
          <div className="u-p-3">
            <PieChart
              datasets={[
                {
                  label: 'Device Types',
                  data: deviceData,
                  color: '#FF6B6B',
                },
              ]}
              size="md"
            />
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} md={4}>
        <Card title="Real-time Metrics" className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-flex-column u-gap-3">
              <div className="u-text-center">
                <GaugeChart
                  value={liveStats.uptime}
                  min={0}
                  max={100}
                  title="System Uptime"
                  size="sm"
                />
              </div>
              <div className="u-text-center">
                <GaugeChart
                  value={liveStats.rating * 20}
                  min={0}
                  max={100}
                  title="User Rating"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} md={4}>
        <Card title="Live Activity Feed" className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-flex-column u-gap-2">
              <div className="u-d-flex u-align-items-center u-p-2 u-bg-brand-subtle u-rounded">
                <div className="u-bg-success u-rounded-circle u-w-2 u-h-2 u-me-2"></div>
                <span className="u-fs-6">New user registered</span>
                <span className="u-text-secondary-emphasis u-fs-6 u-ms-auto">now</span>
              </div>
              <div className="u-d-flex u-align-items-center u-p-2 u-bg-brand-subtle u-rounded">
                <div className="u-bg-primary u-rounded-circle u-w-2 u-h-2 u-me-2"></div>
                <span className="u-fs-6">Payment processed</span>
                <span className="u-text-secondary-emphasis u-fs-6 u-ms-auto">2m ago</span>
              </div>
              <div className="u-d-flex u-align-items-center u-p-2 u-bg-brand-subtle u-rounded">
                <div className="u-bg-warning u-rounded-circle u-w-2 u-h-2 u-me-2"></div>
                <span className="u-fs-6">System alert</span>
                <span className="u-text-secondary-emphasis u-fs-6 u-ms-auto">5m ago</span>
              </div>
              <div className="u-d-flex u-align-items-center u-p-2 u-bg-brand-subtle u-rounded">
                <div className="u-bg-info u-rounded-circle u-w-2 u-h-2 u-me-2"></div>
                <span className="u-fs-6">Data backup completed</span>
                <span className="u-text-secondary-emphasis u-fs-6 u-ms-auto">10m ago</span>
              </div>
            </div>
          </div>
        </Card>
      </GridCol>

      {/* Quick Actions */}
      <GridCol xs={12}>
        <Card title="Quick Actions" className="u-mb-3">
          <div className="u-p-3">
            <Grid>
              <GridCol xs={12} sm={6} md={2}>
                <Button
                  variant="outline-primary"
                  className="u-w-100 u-mb-2 u-d-flex u-flex-column u-align-items-center u-py-3"
                  onClick={() => handleQuickAction('add-user')}
                  disabled={quickActionLoading === 'add-user'}
                >
                  <Icon
                    name={quickActionLoading === 'add-user' ? 'Spinner' : 'Plus'}
                    size="md"
                    className={`u-mb-2 ${quickActionLoading === 'add-user' ? 'u-spin' : ''}`}
                  />
                  <div className="u-fs-6">
                    {quickActionLoading === 'add-user' ? 'Adding...' : 'Add User'}
                  </div>
                </Button>
              </GridCol>
              <GridCol xs={12} sm={6} md={2}>
                <Button
                  variant="outline-success"
                  className="u-w-100 u-mb-2 u-d-flex u-flex-column u-align-items-center u-py-3"
                  onClick={() => handleQuickAction('export-data')}
                  disabled={quickActionLoading === 'export-data'}
                >
                  <Icon
                    name={quickActionLoading === 'export-data' ? 'Spinner' : 'Download'}
                    size="md"
                    className={`u-mb-2 ${quickActionLoading === 'export-data' ? 'u-spin' : ''}`}
                  />
                  <div className="u-fs-6">
                    {quickActionLoading === 'export-data' ? 'Exporting...' : 'Export Data'}
                  </div>
                </Button>
              </GridCol>
              <GridCol xs={12} sm={6} md={2}>
                <Button
                  variant="outline-info"
                  className="u-w-100 u-mb-2 u-d-flex u-flex-column u-align-items-center u-py-3"
                  onClick={() => handleQuickAction('generate-report')}
                  disabled={quickActionLoading === 'generate-report'}
                >
                  <Icon
                    name={quickActionLoading === 'generate-report' ? 'Spinner' : 'FileText'}
                    size="md"
                    className={`u-mb-2 ${quickActionLoading === 'generate-report' ? 'u-spin' : ''}`}
                  />
                  <div className="u-fs-6">
                    {quickActionLoading === 'generate-report' ? 'Generating...' : 'Generate Report'}
                  </div>
                </Button>
              </GridCol>
              <GridCol xs={12} sm={6} md={2}>
                <Button
                  variant="outline-warning"
                  className="u-w-100 u-mb-2 u-d-flex u-flex-column u-align-items-center u-py-3"
                  onClick={() => handleQuickAction('send-alert')}
                  disabled={quickActionLoading === 'send-alert'}
                >
                  <Icon
                    name={quickActionLoading === 'send-alert' ? 'Spinner' : 'Bell'}
                    size="md"
                    className={`u-mb-2 ${quickActionLoading === 'send-alert' ? 'u-spin' : ''}`}
                  />
                  <div className="u-fs-6">
                    {quickActionLoading === 'send-alert' ? 'Sending...' : 'Send Alert'}
                  </div>
                </Button>
              </GridCol>
              <GridCol xs={12} sm={6} md={2}>
                <Button
                  variant="outline-error"
                  className="u-w-100 u-mb-2 u-d-flex u-flex-column u-align-items-center u-py-3"
                  onClick={() => handleQuickAction('security-scan')}
                  disabled={quickActionLoading === 'security-scan'}
                >
                  <Icon
                    name={quickActionLoading === 'security-scan' ? 'Spinner' : 'Shield'}
                    size="md"
                    className={`u-mb-2 ${quickActionLoading === 'security-scan' ? 'u-spin' : ''}`}
                  />
                  <div className="u-fs-6">
                    {quickActionLoading === 'security-scan' ? 'Scanning...' : 'Security Scan'}
                  </div>
                </Button>
              </GridCol>
              <GridCol xs={12} sm={6} md={2}>
                <Button
                  variant="outline-secondary"
                  className="u-w-100 u-mb-2 u-d-flex u-flex-column u-align-items-center u-py-3"
                  onClick={() => setActiveView('settings')}
                >
                  <Icon name="Gear" size="md" className="u-mb-2" />
                  <div className="u-fs-6">Settings</div>
                </Button>
              </GridCol>
            </Grid>
          </div>
        </Card>
      </GridCol>
    </Grid>
  );

  const renderUsersView = () => (
    <>
      {/* Header Actions */}
      <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-4">
        <h1 className="u-fs-1 u-fw-bold">Users</h1>
        <div className="u-d-flex u-gap-2">
          <Button variant="secondary">
            <Icon name="Download" size="sm" className="u-me-1" />
            Export
          </Button>
          <Button variant="primary" onClick={() => setIsAddUserModalOpen(true)}>
            <Icon name="Plus" size="sm" className="u-me-1" />
            Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="u-d-flex u-gap-3 u-mb-4">
        <Input
          placeholder="Search users..."
          className="u-flex-fill"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <Select
          placeholder="Filter by role"
          options={roleOptions}
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
        />
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <Card>
        <DataTable
          data={filteredUsers}
          columns={userColumns}
          sortable={true}
          paginated={true}
          pageSize={20}
          striped={true}
          bordered={true}
          onRowClick={user => handleEditUser(user)}
          emptyMessage="No users found matching your criteria"
        />
      </Card>
    </>
  );

  const renderAnalyticsView = () => (
    <Grid>
      <GridCol xs={12}>
        <Callout variant="info" className="u-mb-4">
          <Icon name="ChartBar" size="sm" className="u-me-2" />
          Analytics dashboard with comprehensive metrics and insights.
        </Callout>
      </GridCol>

      <GridCol xs={12} md={6}>
        <Card title="Performance Metrics" className="u-mb-3">
          <div className="u-p-3">
            <div className="u-mb-3">
              <div className="u-d-flex u-justify-content-between u-mb-1">
                <span>CPU Usage</span>
                <span>65%</span>
              </div>
              <Progress value={65} variant="primary" size="sm" />
            </div>
            <div className="u-mb-3">
              <div className="u-d-flex u-justify-content-between u-mb-1">
                <span>Memory Usage</span>
                <span>78%</span>
              </div>
              <Progress value={78} variant="warning" size="sm" />
            </div>
            <div className="u-mb-3">
              <div className="u-d-flex u-justify-content-between u-mb-1">
                <span>Disk Usage</span>
                <span>45%</span>
              </div>
              <Progress value={45} variant="success" size="sm" />
            </div>
          </div>
        </Card>
      </GridCol>

      <GridCol xs={12} md={6}>
        <Card title="User Engagement" className="u-mb-3">
          <PieChart datasets={userDistributionDatasets} size="md" />
        </Card>
      </GridCol>
    </Grid>
  );

  const renderReportsView = () => (
    <Grid>
      {/* Page Header */}
      <GridCol xs={12}>
        <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-4">
          <div>
            <h1 className="u-fs-1 u-fw-bold u-mb-1">Reports</h1>
            <p className="u-text-secondary-emphasis">
              Generate and manage comprehensive business reports
            </p>
          </div>
          <div className="u-d-flex u-gap-2">
            <Button variant="secondary">
              <Icon name="Calendar" size="sm" className="u-me-1" />
              Schedule Report
            </Button>
            <Button variant="primary">
              <Icon name="FileText" size="sm" className="u-me-1" />
              Generate Report
            </Button>
          </div>
        </div>
      </GridCol>

      {/* Report Filters */}
      <GridCol xs={12}>
        <Card title="Report Filters" className="u-mb-4">
          <div className="u-p-3">
            <Grid>
              <GridCol xs={12} md={3}>
                <FormGroup label="Report Type" htmlFor="report-type">
                  <Select
                    id="report-type"
                    name="reportType"
                    value="user-analytics"
                    options={[
                      { value: 'user-analytics', label: 'User Analytics' },
                      { value: 'sales-performance', label: 'Sales Performance' },
                      { value: 'financial-summary', label: 'Financial Summary' },
                      { value: 'system-health', label: 'System Health' },
                      { value: 'security-audit', label: 'Security Audit' },
                    ]}
                    className="u-w-100"
                  />
                </FormGroup>
              </GridCol>

              <GridCol xs={12} md={3}>
                <FormGroup label="Date Range" htmlFor="date-range">
                  <Select
                    id="date-range"
                    name="dateRange"
                    value="last-30-days"
                    options={[
                      { value: 'today', label: 'Today' },
                      { value: 'last-7-days', label: 'Last 7 Days' },
                      { value: 'last-30-days', label: 'Last 30 Days' },
                      { value: 'last-90-days', label: 'Last 90 Days' },
                      { value: 'custom', label: 'Custom Range' },
                    ]}
                    className="u-w-100"
                  />
                </FormGroup>
              </GridCol>

              <GridCol xs={12} md={3}>
                <FormGroup label="Format" htmlFor="report-format">
                  <Select
                    id="report-format"
                    name="reportFormat"
                    value="pdf"
                    options={[
                      { value: 'pdf', label: 'PDF Document' },
                      { value: 'excel', label: 'Excel Spreadsheet' },
                      { value: 'csv', label: 'CSV File' },
                      { value: 'json', label: 'JSON Data' },
                    ]}
                    className="u-w-100"
                  />
                </FormGroup>
              </GridCol>

              <GridCol xs={12} md={3}>
                <FormGroup label="Status" htmlFor="report-status">
                  <Select
                    id="report-status"
                    name="reportStatus"
                    value="all"
                    options={[
                      { value: 'all', label: 'All Reports' },
                      { value: 'completed', label: 'Completed' },
                      { value: 'pending', label: 'Pending' },
                      { value: 'failed', label: 'Failed' },
                    ]}
                    className="u-w-100"
                  />
                </FormGroup>
              </GridCol>
            </Grid>

            <div className="u-d-flex u-gap-2 u-mt-3">
              <Button variant="primary">
                <Icon name="FunnelSimple" size="sm" className="u-me-1" />
                Apply Filters
              </Button>
              <Button variant="secondary">
                <Icon name="X" size="sm" className="u-me-1" />
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>
      </GridCol>

      {/* Quick Report Cards */}
      <GridCol xs={12}>
        <div className="u-mb-4">
          <h3 className="u-fs-3 u-fw-medium u-mb-3">Quick Reports</h3>
          <Grid>
            <GridCol xs={12} sm={6} md={3}>
              <Card className="u-mb-3 u-text-center">
                <div className="u-p-3">
                  <Icon name="Users" size="lg" className="u-mb-2 u-text-brand-emphasis" />
                  <h5 className="u-fw-medium u-mb-1">User Report</h5>
                  <p className="u-text-secondary-emphasis u-fs-6 u-mb-3">
                    User registrations and activity
                  </p>
                  <Button size="sm" variant="outline-primary" className="u-w-100">
                    Generate
                  </Button>
                </div>
              </Card>
            </GridCol>

            <GridCol xs={12} sm={6} md={3}>
              <Card className="u-mb-3 u-text-center">
                <div className="u-p-3">
                  <Icon name="TrendUp" size="lg" className="u-mb-2 u-text-success-emphasis" />
                  <h5 className="u-fw-medium u-mb-1">Sales Report</h5>
                  <p className="u-text-secondary-emphasis u-fs-6 u-mb-3">
                    Revenue and sales analytics
                  </p>
                  <Button size="sm" variant="outline-primary" className="u-w-100">
                    Generate
                  </Button>
                </div>
              </Card>
            </GridCol>

            <GridCol xs={12} sm={6} md={3}>
              <Card className="u-mb-3 u-text-center">
                <div className="u-p-3">
                  <Icon name="ChartBar" size="lg" className="u-mb-2 u-text-info" />
                  <h5 className="u-fw-medium u-mb-1">Analytics Report</h5>
                  <p className="u-text-secondary-emphasis u-fs-6 u-mb-3">
                    Performance metrics and KPIs
                  </p>
                  <Button size="sm" variant="outline-primary" className="u-w-100">
                    Generate
                  </Button>
                </div>
              </Card>
            </GridCol>

            <GridCol xs={12} sm={6} md={3}>
              <Card className="u-mb-3 u-text-center">
                <div className="u-p-3">
                  <Icon name="Shield" size="lg" className="u-mb-2 u-text-warning" />
                  <h5 className="u-fw-medium u-mb-1">Security Report</h5>
                  <p className="u-text-secondary-emphasis u-fs-6 u-mb-3">
                    Security events and audit logs
                  </p>
                  <Button size="sm" variant="outline-primary" className="u-w-100">
                    Generate
                  </Button>
                </div>
              </Card>
            </GridCol>
          </Grid>
        </div>
      </GridCol>

      {/* Recent Reports Table */}
      <GridCol xs={12} md={8}>
        <Card title="Recent Reports" className="u-mb-3">
          <DataTable
            data={[
              {
                id: 1,
                name: 'User Analytics Report',
                type: 'User Analytics',
                status: 'Completed',
                createdAt: '2024-01-15',
                size: '2.5 MB',
                format: 'PDF',
              },
              {
                id: 2,
                name: 'Sales Performance Q4',
                type: 'Sales Performance',
                status: 'Completed',
                createdAt: '2024-01-14',
                size: '1.8 MB',
                format: 'Excel',
              },
              {
                id: 3,
                name: 'Security Audit Monthly',
                type: 'Security Audit',
                status: 'Pending',
                createdAt: '2024-01-13',
                size: '-',
                format: 'PDF',
              },
              {
                id: 4,
                name: 'Financial Summary',
                type: 'Financial Summary',
                status: 'Completed',
                createdAt: '2024-01-12',
                size: '3.2 MB',
                format: 'PDF',
              },
              {
                id: 5,
                name: 'System Health Check',
                type: 'System Health',
                status: 'Failed',
                createdAt: '2024-01-11',
                size: '-',
                format: 'JSON',
              },
            ]}
            columns={[
              { key: 'name', title: 'Report Name', sortable: true },
              { key: 'type', title: 'Type', sortable: true },
              {
                key: 'status',
                title: 'Status',
                sortable: true,
                render: (value: string) => (
                  <Badge
                    variant={
                      value === 'Completed' ? 'success' : value === 'Pending' ? 'warning' : 'error'
                    }
                    size="sm"
                    label={value}
                  />
                ),
              },
              { key: 'createdAt', title: 'Created', sortable: true },
              { key: 'size', title: 'Size', sortable: true },
              { key: 'format', title: 'Format', sortable: false },
              {
                key: 'actions',
                title: 'Actions',
                render: (value: any, row: any) => (
                  <div className="u-d-flex u-gap-1">
                    {row.status === 'Completed' && (
                      <>
                        <Button size="sm" variant="outline-primary">
                          <Icon name="Download" size="sm" />
                        </Button>
                        <Button size="sm" variant="outline-secondary">
                          <Icon name="Eye" size="sm" />
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline-error">
                      <Icon name="Trash" size="sm" />
                    </Button>
                  </div>
                ),
              },
            ]}
            sortable={true}
            paginated={true}
            pageSize={10}
            striped={true}
            className="u-w-100"
          />
        </Card>
      </GridCol>

      {/* Report Statistics */}
      <GridCol xs={12} md={4}>
        <Card title="Report Statistics" className="u-mb-3">
          <div className="u-p-3">
            <div className="u-mb-3">
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span className="u-fw-medium">Total Reports</span>
                <span className="u-fw-bold u-text-brand-emphasis">247</span>
              </div>
              <Progress value={100} variant="primary" size="sm" />
            </div>

            <div className="u-mb-3">
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span className="u-fw-medium">Completed</span>
                <span className="u-fw-bold u-text-success-emphasis">198</span>
              </div>
              <Progress value={80} variant="success" size="sm" />
            </div>

            <div className="u-mb-3">
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span className="u-fw-medium">Pending</span>
                <span className="u-fw-bold u-text-warning">35</span>
              </div>
              <Progress value={14} variant="warning" size="sm" />
            </div>

            <div className="u-mb-3">
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span className="u-fw-medium">Failed</span>
                <span className="u-fw-bold u-text-error">14</span>
              </div>
              <Progress value={6} variant="error" size="sm" />
            </div>

            <div className="u-border-top u-pt-3 u-mt-3">
              <div className="u-text-center">
                <div className="u-fs-1 u-fw-bold u-text-brand-emphasis u-mb-1">15.7 GB</div>
                <div className="u-text-secondary-emphasis u-fs-6">Total Storage Used</div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Scheduled Reports" className="u-mb-3">
          <div className="u-p-3">
            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-3">
              <div>
                <div className="u-fw-medium">Weekly User Report</div>
                <div className="u-text-secondary-emphasis u-fs-6">Every Monday at 9:00 AM</div>
              </div>
              <Toggle />
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-3">
              <div>
                <div className="u-fw-medium">Monthly Sales Report</div>
                <div className="u-text-secondary-emphasis u-fs-6">1st of every month</div>
              </div>
              <Toggle />
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-3">
              <div>
                <div className="u-fw-medium">Daily Security Audit</div>
                <div className="u-text-secondary-emphasis u-fs-6">Every day at 2:00 AM</div>
              </div>
              <Toggle />
            </div>

            <Button variant="outline-primary" size="sm" className="u-w-100">
              <Icon name="Plus" size="sm" className="u-me-1" />
              Add Schedule
            </Button>
          </div>
        </Card>
      </GridCol>

      {/* Report Charts */}
      <GridCol xs={12}>
        <Card title="Report Generation Trends" className="u-mb-3">
          <div className="u-p-3">
            <Grid>
              <GridCol xs={12} md={8}>
                <LineChart
                  datasets={[
                    {
                      label: 'Reports Generated',
                      data: [
                        { label: 'Jan', value: 45 },
                        { label: 'Feb', value: 52 },
                        { label: 'Mar', value: 38 },
                        { label: 'Apr', value: 67 },
                        { label: 'May', value: 74 },
                        { label: 'Jun', value: 56 },
                      ],
                      color: '#7AFFD7',
                    },
                  ]}
                  size="md"
                />
              </GridCol>

              <GridCol xs={12} md={4}>
                <DonutChart
                  datasets={[
                    {
                      label: 'Report Types',
                      data: [
                        { label: 'User Analytics', value: 35 },
                        { label: 'Sales', value: 25 },
                        { label: 'Security', value: 20 },
                        { label: 'Financial', value: 20 },
                      ],
                      color: '#1AFFD2',
                    },
                  ]}
                  size="sm"
                />
              </GridCol>
            </Grid>
          </div>
        </Card>
      </GridCol>
    </Grid>
  );

  const renderSettingsView = () => (
    <Grid>
      {/* Page Header */}
      <GridCol xs={12}>
        <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-4">
          <div>
            <h1 className="u-fs-1 u-fw-bold u-mb-1">Settings</h1>
            <p className="u-text-secondary-emphasis">
              Manage your application preferences and configuration
            </p>
          </div>
          <div className="u-d-flex u-gap-2">
            <Button variant="secondary">
              <Icon name="ArrowCounterClockwise" size="sm" className="u-me-1" />
              Reset All
            </Button>
            <Button variant="primary">
              <Icon name="FloppyDisk" size="sm" className="u-me-1" />
              Save Changes
            </Button>
          </div>
        </div>
      </GridCol>

      {/* General Settings */}
      <GridCol xs={12} md={6}>
        <Card title="General Settings" className="u-mb-3">
          <div className="u-p-3">
            <div className="u-mb-3">
              <FormGroup label="Application Name" htmlFor="app-name">
                <Input
                  id="app-name"
                  name="appName"
                  value="Atomix Admin Dashboard"
                  className="u-w-100"
                />
              </FormGroup>
            </div>

            <div className="u-mb-3">
              <FormGroup label="Default Language" htmlFor="language">
                <Select
                  id="language"
                  name="language"
                  value="en"
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                    { value: 'de', label: 'German' },
                  ]}
                  className="u-w-100"
                />
              </FormGroup>
            </div>

            <div className="u-mb-3">
              <FormGroup label="Timezone" htmlFor="timezone">
                <Select
                  id="timezone"
                  name="timezone"
                  value="UTC"
                  options={[
                    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
                    { value: 'EST', label: 'EST (Eastern Standard Time)' },
                    { value: 'PST', label: 'PST (Pacific Standard Time)' },
                    { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
                  ]}
                  className="u-w-100"
                />
              </FormGroup>
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
              <div>
                <div className="u-fw-medium">Dark Mode</div>
                <div className="u-text-secondary-emphasis u-fs-6">Switch to dark theme</div>
              </div>
              <Toggle />
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center">
              <div>
                <div className="u-fw-medium">Auto-save</div>
                <div className="u-text-secondary-emphasis u-fs-6">Automatically save changes</div>
              </div>
              <Toggle />
            </div>
          </div>
        </Card>
      </GridCol>

      {/* Security Settings */}
      <GridCol xs={12} md={6}>
        <Card title="Security Settings" className="u-mb-3">
          <div className="u-p-3">
            <div className="u-mb-3">
              <FormGroup label="Session Timeout (minutes)" htmlFor="session-timeout">
                <Input
                  id="session-timeout"
                  name="sessionTimeout"
                  type="number"
                  value="30"
                  min="5"
                  max="120"
                  className="u-w-100"
                />
              </FormGroup>
            </div>

            <div className="u-mb-3">
              <FormGroup label="Password Policy" htmlFor="password-policy">
                <Select
                  id="password-policy"
                  name="passwordPolicy"
                  value="medium"
                  options={[
                    { value: 'low', label: 'Low - Minimum 6 characters' },
                    { value: 'medium', label: 'Medium - 8 chars, mixed case' },
                    { value: 'high', label: 'High - 12 chars, symbols required' },
                  ]}
                  className="u-w-100"
                />
              </FormGroup>
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
              <div>
                <div className="u-fw-medium">Two-Factor Authentication</div>
                <div className="u-text-secondary-emphasis u-fs-6">
                  Enable 2FA for enhanced security
                </div>
              </div>
              <Toggle />
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
              <div>
                <div className="u-fw-medium">Login Notifications</div>
                <div className="u-text-secondary-emphasis u-fs-6">Notify on new login attempts</div>
              </div>
              <Toggle />
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center">
              <div>
                <div className="u-fw-medium">IP Restriction</div>
                <div className="u-text-secondary-emphasis u-fs-6">
                  Restrict access by IP address
                </div>
              </div>
              <Toggle />
            </div>
          </div>
        </Card>
      </GridCol>

      {/* Notification Settings */}
      <GridCol xs={12} md={6}>
        <Card title="Notification Settings" className="u-mb-3">
          <div className="u-p-3">
            <div className="u-mb-3">
              <h6 className="u-fw-medium u-mb-2">Email Notifications</h6>

              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span>System alerts</span>
                <Toggle />
              </div>

              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span>User registrations</span>
                <Toggle />
              </div>

              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-3">
                <span>Weekly reports</span>
                <Toggle />
              </div>
            </div>

            <div className="u-mb-3">
              <h6 className="u-fw-medium u-mb-2">Push Notifications</h6>

              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span>Browser notifications</span>
                <Toggle />
              </div>

              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <span>Mobile notifications</span>
                <Toggle />
              </div>

              <div className="u-d-flex u-justify-content-between u-align-items-center">
                <span>Desktop alerts</span>
                <Toggle />
              </div>
            </div>
          </div>
        </Card>
      </GridCol>

      {/* Data & Privacy */}
      <GridCol xs={12} md={6}>
        <Card title="Data & Privacy" className="u-mb-3">
          <div className="u-p-3">
            <div className="u-mb-3">
              <FormGroup label="Data Retention (days)" htmlFor="data-retention">
                <Select
                  id="data-retention"
                  name="dataRetention"
                  value="90"
                  options={[
                    { value: '30', label: '30 days' },
                    { value: '60', label: '60 days' },
                    { value: '90', label: '90 days' },
                    { value: '180', label: '180 days' },
                    { value: '365', label: '1 year' },
                  ]}
                  className="u-w-100"
                />
              </FormGroup>
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
              <div>
                <div className="u-fw-medium">Analytics Tracking</div>
                <div className="u-text-secondary-emphasis u-fs-6">Collect usage analytics</div>
              </div>
              <Toggle />
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
              <div>
                <div className="u-fw-medium">Data Export</div>
                <div className="u-text-secondary-emphasis u-fs-6">Allow data export</div>
              </div>
              <Toggle />
            </div>

            <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-3">
              <div>
                <div className="u-fw-medium">GDPR Compliance</div>
                <div className="u-text-secondary-emphasis u-fs-6">Enable GDPR features</div>
              </div>
              <Toggle />
            </div>

            <div className="u-d-flex u-gap-2">
              <Button variant="outline-error" size="sm" className="u-flex-fill">
                <Icon name="Download" size="sm" className="u-me-1" />
                Export Data
              </Button>
              <Button variant="outline-error" size="sm" className="u-flex-fill">
                <Icon name="Trash" size="sm" className="u-me-1" />
                Delete Data
              </Button>
            </div>
          </div>
        </Card>
      </GridCol>

      {/* API Settings */}
      <GridCol xs={12}>
        <Card title="API Settings" className="u-mb-3">
          <div className="u-p-3">
            <Grid>
              <GridCol xs={12} md={6}>
                <div className="u-mb-3">
                  <FormGroup label="API Rate Limit (requests/hour)" htmlFor="rate-limit">
                    <Input
                      id="rate-limit"
                      name="rateLimit"
                      type="number"
                      value="1000"
                      className="u-w-100"
                    />
                  </FormGroup>
                </div>

                <div className="u-mb-3">
                  <FormGroup label="API Version" htmlFor="api-version">
                    <Select
                      id="api-version"
                      name="apiVersion"
                      value="v2"
                      options={[
                        { value: 'v1', label: 'Version 1.0 (Legacy)' },
                        { value: 'v2', label: 'Version 2.0 (Current)' },
                        { value: 'v3', label: 'Version 3.0 (Beta)' },
                      ]}
                      className="u-w-100"
                    />
                  </FormGroup>
                </div>
              </GridCol>

              <GridCol xs={12} md={6}>
                <div className="u-mb-3">
                  <h6 className="u-fw-medium u-mb-2">API Features</h6>

                  <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                    <span>CORS Enabled</span>
                    <Toggle />
                  </div>

                  <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                    <span>API Key Authentication</span>
                    <Toggle />
                  </div>

                  <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                    <span>Request Logging</span>
                    <Toggle />
                  </div>

                  <div className="u-d-flex u-justify-content-between u-align-items-center">
                    <span>Rate Limiting</span>
                    <Toggle />
                  </div>
                </div>
              </GridCol>
            </Grid>

            <div className="u-border-top u-pt-3 u-mt-3">
              <div className="u-d-flex u-justify-content-between u-align-items-center u-mb-2">
                <div>
                  <div className="u-fw-medium">Current API Key</div>
                  <div className="u-text-secondary-emphasis u-fs-6">
                    sk_live_****************************
                  </div>
                </div>
                <div className="u-d-flex u-gap-2">
                  <Button variant="secondary" size="sm">
                    <Icon name="Eye" size="sm" className="u-me-1" />
                    Reveal
                  </Button>
                  <Button variant="outline-primary" size="sm">
                    <Icon name="ArrowsClockwise" size="sm" className="u-me-1" />
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </GridCol>
    </Grid>
  );

  const renderCurrentView = () => {
    switch (activeView) {
      case 'dashboard':
        return renderDashboardView();
      case 'users':
        return renderUsersView();
      case 'analytics':
        return renderAnalyticsView();
      case 'reports':
        return renderReportsView();
      case 'settings':
        return renderSettingsView();
      default:
        return renderDashboardView();
    }
  };

  return (
    <div className="o-container-fluid">
      {/* Sidebar Navigation */}
      <Grid>
        <GridCol xs={12} md={3}>
          <div className="u-p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="48" viewBox="0 0 100 48">
              <g transform="translate(0, 8) scale(0.06)">
                <path
                  fill="#7c3aed"
                  d="M256 398.8c-11.8 5.1-23.4 9.7-34.9 13.5c16.7 33.8 31 35.7 34.9 35.7s18.1-1.9 34.9-35.7c-11.4-3.9-23.1-8.4-34.9-13.5zM446 256c33 45.2 44.3 90.9 23.6 128c-20.2 36.3-62.5 49.3-115.2 43.2c-22 52.1-55.6 84.8-98.4 84.8s-76.4-32.7-98.4-84.8c-52.7 6.1-95-6.8-115.2-43.2C21.7 346.9 33 301.2 66 256c-33-45.2-44.3-90.9-23.6-128c20.2-36.3 62.5-49.3 115.2-43.2C179.6 32.7 213.2 0 256 0s76.4 32.7 98.4 84.8c52.7-6.1 95 6.8 115.2 43.2c20.7 37.1 9.4 82.8-23.6 128zm-65.8 67.4c-1.7 14.2-3.9 28-6.7 41.2c31.8 1.4 38.6-8.7 40.2-11.7c2.3-4.2 7-17.9-11.9-48.1c-6.8 6.3-14 12.5-21.6 18.6zm-6.7-175.9c2.8 13.1 5 26.9 6.7 41.2c7.6 6.1 14.8 12.3 21.6 18.6c18.9-30.2 14.2-44 11.9-48.1c-1.6-2.9-8.4-13-40.2-11.7zM290.9 99.7C274.1 65.9 259.9 64 256 64s-18.1 1.9-34.9 35.7c11.4 3.9 23.1 8.4 34.9 13.5c11.8-5.1 23.4-9.7 34.9-13.5zm-159 88.9c1.7-14.3 3.9-28 6.7-41.2c-31.8-1.4-38.6 8.7-40.2 11.7c-2.3 4.2-7 17.9 11.9 48.1c6.8-6.3 14-12.5 21.6-18.6zM110.2 304.8C91.4 335 96 348.7 98.3 352.9c1.6 2.9 8.4 13 40.2 11.7c-2.8-13.1-5-26.9-6.7-41.2c-7.6-6.1-14.8-12.3-21.6-18.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-80-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                ></path>
              </g>

              <text x="32" y="32" font-size="22" font-weight="700" fill="#7c3aed">
                Atomix
              </text>
            </svg>
          </div>
          <SideMenu title="Admin Panel" collapsible={false}>
            <SideMenuList>
              <SideMenuItem
                href="#dashboard"
                icon={<Icon name="ChartBar" size="sm" />}
                active={activeView === 'dashboard'}
                onClick={() => setActiveView('dashboard')}
              >
                Dashboard
              </SideMenuItem>
              <SideMenuItem
                href="#users"
                icon={<Icon name="Users" size="sm" />}
                active={activeView === 'users'}
                onClick={() => setActiveView('users')}
              >
                Users
              </SideMenuItem>
              <SideMenuItem
                href="#analytics"
                icon={<Icon name="TrendUp" size="sm" />}
                active={activeView === 'analytics'}
                onClick={() => setActiveView('analytics')}
              >
                Analytics
              </SideMenuItem>
              <SideMenuItem
                href="#settings"
                icon={<Icon name="Gear" size="sm" />}
                onClick={() => setActiveView('settings')}
              >
                Settings
              </SideMenuItem>
              <SideMenuItem
                href="#reports"
                icon={<Icon name="FileText" size="sm" />}
                onClick={() => setActiveView('reports')}
              >
                Reports
              </SideMenuItem>
            </SideMenuList>
          </SideMenu>
        </GridCol>

        {/* Main Content Area */}
        <GridCol xs={12} md={9}>
          {/* Top Navigation */}
          <Navbar className="u-border-b">
            <Nav className="u-justify-content-between u-w-100">
              <div className="u-d-flex u-align-items-center">
                <Breadcrumb
                  items={[
                    { label: 'Admin', href: '#' },
                    {
                      label: activeView.charAt(0).toUpperCase() + activeView.slice(1),
                      href: '#',
                    },
                  ]}
                />
              </div>
              <div className="u-d-flex u-align-items-center u-gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNotificationClick}
                  className={notificationCount > 0 ? 'u-relative' : ''}
                >
                  <Icon name="Bell" size="sm" />
                  {notificationCount > 0 && (
                    <Badge
                      variant="error"
                      size="sm"
                      label={notificationCount.toString()}
                      className="u-absolute u-top-0 u-end-0 u-transform u-translate-x-1/2 u--translate-y-1/2"
                    />
                  )}
                </Button>
                <ColorModeToggle className="u-text-secondary-emphasis" />
                <NavDropdown title="Profile">
                  <Menu>
                    <MenuItem href="#settings">Settings</MenuItem>
                    <MenuItem href="#logout">Logout</MenuItem>
                  </Menu>
                </NavDropdown>
              </div>
            </Nav>
          </Navbar>

          {/* Content */}
          <div className="u-flex-fill u-overflow-auto">
            <Block spacing="md" className="u-p-4">
              {renderCurrentView()}
            </Block>
          </div>
        </GridCol>
      </Grid>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserModalOpen}
        onOpenChange={setIsAddUserModalOpen}
        title="Add New User"
        size="md"
        footer={
          <div className="u-d-flex u-gap-2 u-justify-content-end">
            <Button variant="secondary" onClick={() => setIsAddUserModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="add-user-form">
              Add User
            </Button>
          </div>
        }
      >
        <Form id="add-user-form" onSubmit={handleUserSubmit}>
          <div className="u-mb-3">
            <FormGroup label="Full Name" htmlFor="add-name" required>
              <Input
                id="add-name"
                name="name"
                required
                className="u-w-100"
                placeholder="Enter full name"
              />
            </FormGroup>
          </div>
          <div className="u-mb-3">
            <FormGroup label="Email" htmlFor="add-email" required>
              <Input
                id="add-email"
                name="email"
                type="email"
                required
                className="u-w-100"
                placeholder="Enter email address"
              />
            </FormGroup>
          </div>
          <div className="u-mb-3">
            <FormGroup label="Role" htmlFor="add-role" required>
              <Select
                id="add-role"
                name="role"
                options={roleOptions.slice(1)} // Remove "All Roles" option
                className="u-w-100"
                required
              />
            </FormGroup>
          </div>
          <div className="u-mb-3">
            <FormGroup label="Status" htmlFor="add-status" required>
              <Select
                id="add-status"
                name="status"
                options={statusOptions.slice(1)} // Remove "All Statuses" option
                className="u-w-100"
                required
              />
            </FormGroup>
          </div>
        </Form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditUserModalOpen}
        onOpenChange={setIsEditUserModalOpen}
        title="Edit User"
        size="md"
        footer={
          <div className="u-d-flex u-gap-2 u-justify-content-end">
            <Button variant="secondary" onClick={() => setIsEditUserModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="edit-user-form">
              Save Changes
            </Button>
          </div>
        }
      >
        {selectedUser && (
          <Form id="edit-user-form" onSubmit={handleUserSubmit}>
            <div className="u-mb-3">
              <FormGroup label="Full Name" htmlFor="edit-name" required>
                <Input
                  id="edit-name"
                  name="name"
                  required
                  className="u-w-100"
                  value={editFormData.name}
                  onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                />
              </FormGroup>
            </div>
            <div className="u-mb-3">
              <FormGroup label="Email" htmlFor="edit-email" required>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  required
                  className="u-w-100"
                  value={editFormData.email}
                  onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                />
              </FormGroup>
            </div>
            <div className="u-mb-3">
              <FormGroup label="Role" htmlFor="edit-role" required>
                <Select
                  id="edit-role"
                  name="role"
                  options={roleOptions.slice(1)}
                  className="u-w-100"
                  value={editFormData.role}
                  onChange={e => setEditFormData({ ...editFormData, role: e.target.value })}
                  required
                />
              </FormGroup>
            </div>
            <div className="u-mb-3">
              <FormGroup label="Status" htmlFor="edit-status" required>
                <Select
                  id="edit-status"
                  name="status"
                  options={statusOptions.slice(1)}
                  className="u-w-100"
                  value={editFormData.status}
                  onChange={e => setEditFormData({ ...editFormData, status: e.target.value })}
                  required
                />
              </FormGroup>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;

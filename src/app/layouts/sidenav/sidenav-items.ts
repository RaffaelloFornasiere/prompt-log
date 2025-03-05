import {SidenavItem} from './sidenav.service';

export const sidenavItems: SidenavItem [] = [
  {
    name: 'Task Description',
    label: 'Task Description',
    route: 'task-description',
    icon: 'task'
  },
  {
    name: 'Actions',
    label: 'Actions',
    route: 'actions',
    icon: 'app_registration'
  },
  {
    name: 'Examples',
    label: 'Examples',
    route: 'examples',
    icon: "content_copy"
  },
  {
    name: 'Prompt',
    label: 'Prompt',
    route: '',
    icon: 'check'
  },
  {
    name: 'Export',
    label: 'Export',
    route: 'export',
    icon: 'cloud_download'
  }

]

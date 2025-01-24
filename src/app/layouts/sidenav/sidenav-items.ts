import {SidenavItem} from './sidenav.service';

export const sidenavItems: SidenavItem [] = [
  {
    name: 'Prompt Settings',
    label: 'Prompt Settings',
    route: 'prompt-settings',
    icon: 'settings'
  },
  {
    name: 'Task Description',
    label: 'Task Description',
    route: '',
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
    route: 'prompt',
    icon: 'check'
  },

]

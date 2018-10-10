/*jshint esversion: 6 */
import Landing from './components/landing/Landing.vue';

import Editor from './components/editor/Editor.vue';

import Docs from './components/docs/Docs.vue';
import IntroDocs from './components/docs/pages/Introduction.md';
import EditorDocs from './components/docs/pages/Editor.md';
import ApiDocs from './components/docs/pages/Api.md';
import TestDocs from './components/docs/pages/Test.vue';


export const routes = [
    { path: '', component: Editor },
    { path: '/example', component: Editor},
    { path: '/docs', component: Docs, children: [
        { path: '', component: TestDocs },
        { path: 'editor', component: EditorDocs },
        { path: 'api', component: ApiDocs }
    ]}

];

// This file handles the management of the state for the annotation tool.
// This specifies the layout of the annotation interface. This may include
// the required steps and instructions, the tools necessary to complete
// the annotations or the default image and annotation content.
import axios from 'axios';
import Vue from 'vue';

const state = {
        activeStep: 1,
        steps: [
            {   id: 1,
                tools: ['pan', 'circle', 'rectangle', 'pen', 'pencil', 'move', 'node', 'count'],
                ROI: false,
                color: {    stroke: {hue: 170, saturation: 0.7, lightness: 0.5, alpha: 1},
                            fill: {hue: 170, saturation: 0.7, lightness: 0.5, alpha: 0.4}
                        },
                instruction: 'Instructions for Step 1: Use the circle tool to mark the lymphocytes within the region of interest.'
            },
            {   id: 2,
                tools: ['pan', 'circle', 'rectangle', 'pen', 'pencil', 'move', 'node', 'count'],
                ROI: false,
                color: {    stroke: {hue: 350, saturation: 0.7, lightness: 0.5, alpha: 1},
                            fill: {hue: 350, saturation: 0.7, lightness: 0.5, alpha: 0.4}
                        },
                instruction: 'Instructions for Step 2: Use the pencil tool to mark the non-tumour region.'
            },
            {   id: 3,
                tools: ['pan', 'circle', 'rectangle', 'pen', 'pencil', 'move', 'node', 'count'],
                ROI: false,
                color: {    stroke: {hue: 20, saturation: 0.7, lightness: 0.5, alpha: 1},
                            fill: {hue: 20, saturation: 0.7, lightness: 0.5, alpha: 0.4}
                        },
                instruction: 'Instructions for Step 3: Use the pencil tool to mark the central region of the tumour.'
            },
            {   id: 4,
                tools: ['pan', 'circle', 'rectangle', 'pen', 'pencil', 'move', 'node', 'count'],
                ROI: false,
                color: {    stroke: {hue: 200, saturation: 0.7, lightness: 0.5, alpha: 1},
                            fill: {hue: 200, saturation: 0.7, lightness: 0.5, alpha: 0.4}
                        },
                instruction: 'Instructions for Step 4: Use the pencil tool to mark the invasive margin.'
            },
            {   id: 5,
                tools: ['pan', 'circle', 'rectangle', 'pen', 'pencil', 'move', 'node', 'count'],
                ROI: false,
                color: {    stroke: {hue: 240, saturation: 0.7, lightness: 0.5, alpha: 1},
                            fill: {hue: 240, saturation: 0.7, lightness: 0.5, alpha: 0.4}
                        },
                instruction: 'Instructions for Step 5: Use the pencil tool to mark the area around the glands.'
            }
        ],
        tools: {
            pan: {
                name: 'Pan and Zoom',
                caption: 'Pan and zoom'
            },
            circle: {
                name: 'Circle',
                caption: 'Plot circlular markers',
            },
            rectangle: {
                name: 'Rectangle',
                caption: 'Draw rectangles'
            },
            pen: {
                name: 'Pen',
                caption: 'Draw smooth paths by plotting node points'
            },
            pencil: {
                name: 'Pencil',
                caption: 'Draw smooth paths by dragging the mouse'
            },
            move: {
                name: 'Move',
                caption: 'Move and scale items'
            },
            node: {
                name: 'Node',
                caption: 'Manipulate path nodes and handles'
            },
            count: {
                name: 'Count',
                caption: 'Count items within a specified rectangle'
            }
        },
        channels: [{
            name: 'Image',
            url: "/static/Downloads.dzi"
        }],
        annotation: ``,
        savedLayer: [["Layer",{"name":"Thing1","applyMatrix":true}],
        ["Layer",{"name":"Thing2","applyMatrix":true}],
        ["Layer",{"name":"Thing3","applyMatrix":true}],
        ["Layer",{"name":"Thing4","applyMatrix":true}],
        ["Layer",{"name":"Thing5","applyMatrix":true}]]
};

const getters = {

	// Get an array specifiying the tools included in the current step.
	getConfigStepTools: state => {
		return state.steps[state.activeStep - 1].tools
	},

    // Get an object that specifies the default color for annotatations in this
    // step.
    getDefaultColor: state => {
        return state.steps[state.activeStep - 1].color
    }
};

const actions = {

    // Load a configuration into the tool.
    // May perform asynchronous tasks here (like pulling from REST API) before
    // committing the state mutation which must run synchronously.
    loadConfig: ({state, rootState, commit, dispatch}, newConfig) => {

        // Update the PaperJS project representation
        // dispatch('loadProject', state.annotation, {root: true});
        // Update the OpenSeaDragon image channels
        dispatch('addImages', state.channels, {root: true});
    },

	addImage: ({commit}, payload) => {
		commit('addImage', payload);
	},

    // Action dispatches events to set both the active step and the active layer
    // ensuring that they are in sync.
    setActiveStepAndLayer: ({dispatch}, step) => {
        dispatch('setActiveLayer', step);
        dispatch('setActiveStep', step);
    },

	setActiveStep: ({commit}, step) => {
		commit('setActiveStep', step);
	},

    // Save the current configuration to the server.
    saveConfig: ({dispatch, commit, state}) => {

        // Update the config and then save to RestAPI
        dispatch('updateConfig', state).then(() => {

            // Here is where we would push to REST API
            // ****** Save to API *****
            // axios.put('https://api.jsonbin.io/b/5b0c164d7a973f4ce5784989', {
            //     config: state
            // })
            // .then(function (response) {
                console.log(response)
            // })
        })
    },

    updateConfig: ({dispatch, commit, rootState, rootGetters}) => {
        let newAnnotations = rootGetters.getAnnotationProjectJSON;
        commit('updateConfig', newAnnotations);
    }
};

const mutations = {
	addImage: (state, payload) => {
		state.channels.push()
	},

	setActiveStep: (state, step) => {
		state.activeStep = step;
	},

    updateConfig: (state, newAnnotations) => {
        state.annotation = newAnnotations;
    },

    loadConfig: (state, payload) => {
        Vue.set(payload.rootState, 'config', payload.newConfig);
    }
};

// Export all of the relevent logic so that it can be combined with the complete
// store and all other module logic.
export default {
	state,
	getters,
	actions,
	mutations
};

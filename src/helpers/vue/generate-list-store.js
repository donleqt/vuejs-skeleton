import { objectMap, toCapitalized } from '@/helpers/utils';
import { createSampleListing } from '@/helpers/samples';

const generateListStore = ({ namespace: NAMESPACE, listName: RESOURCES, getList }) => {
  const UPPERCASE_RESOURCES = RESOURCES.toUpperCase();
  const RESOURCES_CAPITALIZED = toCapitalized(RESOURCES);
  const mutationTypes = {
    doGet: `@${NAMESPACE}/GET_LIST_${UPPERCASE_RESOURCES}`,
    getSuccess: `@${NAMESPACE}/GET_LIST_${UPPERCASE_RESOURCES}_SUCCESS`,
    getFail: `@${NAMESPACE}/GET_LIST_${UPPERCASE_RESOURCES}_FAIL`,
  };

  const actions = {
    async [`getList${RESOURCES_CAPITALIZED}`]({ commit }, params) {
      commit(mutationTypes.doGet);
      try {
        const resp = await getList(params);
        commit(mutationTypes.getSuccess, { data: resp.data });
      } catch (err) {
        console.error(err);
        commit(mutationTypes.getFail, { errors: err });
      }
    },
  };

  const mutations = {
    [mutationTypes.doGet](state) { return state[RESOURCES].isFetching = true; },
    [mutationTypes.getSuccess](state, payload) {
      state[RESOURCES].isFetching = false;
      state[RESOURCES].data = payload.data;
      state[RESOURCES].paging = payload.paging;
    },
    [mutationTypes.getFail](state, payload) {
      state[RESOURCES].isFetching = false;
      state[RESOURCES].errors = payload.errors;
    },
  };

  const state = {
    [RESOURCES]: createSampleListing(),
  };

  const getters = {
    [`selectList${RESOURCES_CAPITALIZED}`](localState) { return localState[RESOURCES]; },
  };

  const convertedMutationTypes = {};
  objectMap(mutationTypes, (v) => {
    convertedMutationTypes[v.replace(`@${NAMESPACE}/`, '')] = v;
  });

  return {
    state,
    getters,
    actions,
    mutations,
    mutationTypes: convertedMutationTypes,
  };
};

export default generateListStore;

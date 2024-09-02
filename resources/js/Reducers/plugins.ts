import { SavablePlugin, pluginAction } from "@/types";


export default function pluginReducer(state: SavablePlugin[], action: pluginAction) {
    if (action.type === 'toggle_save') {
        return state.map(plugin => {
            if (plugin.id.toString() !== action.pluginId) return plugin;
            else return {
                ...plugin,
                saved: !plugin.saved
            }
        })
    }

    if (action.type === 'toggle_sort_order') {
        return state.toReversed();
    }

    if (action.type === 'sort_by_stars') {
        return state.toSorted((a, b) => b.stargazers_count - a.stargazers_count)
    }

    if (action.type === 'sort_by_name') {
        return state.toSorted((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    }

    if (action.type === 'sort_by_owner') {
        return state.toSorted((a, b) => a.author.login.toLowerCase() > b.author.login.toLowerCase() ? 1 : -1)
    }

    if (action.type === 'sort_by_updated') {
        return state.toSorted((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
    }

    if (action.type === 'sort_by_created') {
        return state.toSorted((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    }

    else return state
}

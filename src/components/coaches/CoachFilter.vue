<template>
    <base-card>
        <h2>Filter</h2>
        <span class="filter-option">
            <input type="checkbox" name="lightside" id="lightside" checked @change="setFilter" />
            <label for="lightside">Lightside</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" name="darkside" id="darkside" checked @change="setFilter" />
            <label for="darkside">Darkside</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" name="lightsabre" id="lightsabre" checked @change="setFilter" />
            <label for="lightsabre">Lightsabre</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" name="forceghost" id="forceghost" checked @change="setFilter" />
            <label for="forceghost">Force Ghost</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" name="fear" id="fear" checked @change="setFilter" />
            <label for="fear">Fear</label>
        </span>
    </base-card>
</template>

<script>
export default {
    emits: ['change-filter'],
    data() {
        return {
            filters: {
                lightside: true,
                darkside: true,
                lightsabre: true,
                forceghost: true,
                fear: true,
            },
        };
    },
    methods: {
        setFilter(event) {
            console.log('setFilter');
            const inputId = event.target.id;
            const isChecked = event.target.checked;
            const updatedFilter = {
                ...this.filters,
                [inputId]: isChecked,
            };
            this.filters = updatedFilter;
            console.log(this.filters);
            this.$emit('change-filter', updatedFilter);
        },
    },
};
</script>

<style scoped>
h2 {
    margin: 0.5rem 0;
}

.filter-option {
    margin-right: 1rem;
}

.filter-option label,
.filter-option input {
    vertical-align: middle;
}

.filter-option label {
    margin-left: 0.25rem;
}

.filter-option.active label {
    font-weight: bold;
}
</style>

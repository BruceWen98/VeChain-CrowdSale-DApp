<template>
    <span>
        <home-hero></home-hero>
        <home-plans></home-plans>
        <home-details></home-details>
    </span>
</template>

<script>
import HomeHero from '@/components/HomeHero';
import HomeDetails from '@/components/HomeDetails';
import HomePlans from '@/components/HomePlans';

export default {
    name: 'home',
    components: {
        HomeHero,
        HomeDetails,
        HomePlans
    }
};
</script>

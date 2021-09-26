<template>
  <div class="paginator">
    <!-- INDICATES CURRENT PAGE -->
    <div class="page-ratio">
      <p>Page {{ currentPage }}/{{ pageNumber }}</p>
    </div>

    <div class="page-control">
      <img
        src="https://s2.svgbox.net/hero-outline.svg?ic=chevron-left&color=080808"
        width="20"
        height="20"
        class="left-caret"
        @click="shiftPage(-1)"
      />

      <div class="pages">
        <router-link
          v-for="(page, index) in getPageRange"
          :key="index"
          :to="{ name: 'People', params: { page: page } }"
          :active-class="'active-page'"
        >
          {{ page }}
        </router-link>
      </div>

      <img
        src="https://s2.svgbox.net/hero-outline.svg?ic=chevron-right&color=080808"
        width="20"
        height="20"
        class="right-caret"
        @click="shiftPage(1)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "paginator",

  props: {
    pageNumber: {
      type: Number,
    },
  },

  computed: {
    getPageRange() {
      // returns a slice (5) of the pages based on the pageStartRange
      return this.pages.slice(this.pageRangeStart, this.pageRangeStart + 5);
    },

    isLastIndexInRange() {
      // checks if the current page is the last in the page range
      return (
        this.getPageRange[this.getPageRange.length - 1] === this.currentPage
      );
    },

    iFirstIndexInRange() {
      // checks if the current page is the first in the page range
      return this.getPageRange[0] === this.currentPage;
    },

    currentPage() {
      return Number(this.$route.params.page);
    },
  },

  mounted() {
    //initializes the pages array based on the page route
    for (let i = 1; i <= this.pageNumber; i++) {
      this.pages.push(i);
    }
    this.initializePageStartRange();
  },

  data() {
    return {
      pageRangeStart: 0,
      pages: [],
    };
  },

  methods: {
    initializePageStartRange() {
      // if there is at least 5 pages to the left of the 'current page', start page at 5 units to the left
      // of current page,
      // else start page range at 0

      this.currentPage - 5 < 0
        ? (this.pageRangeStart = 0)
        : (this.pageRangeStart = this.currentPage - 5);
    },

    shiftPage(direction) {
      if (direction === -1 && this.currentPage > 1) {
        if (this.iFirstIndexInRange) {
          // if there is at least three pages to the left, shift the pageStartRange to the left by 3 units
          let temporal_start_range = this.pageRangeStart - 3;

          temporal_start_range < 0
            ? (this.pageRangeStart = 0)
            : (this.pageRangeStart = temporal_start_range);
        }

        // 'push' page to the left by 1 unit
        this.$router.push({
          name: "People",
          params: { page: this.currentPage - 1 },
        });
      }

      if (direction === +1 && this.currentPage < this.pages.length) {
        if (this.isLastIndexInRange) {
          // if there is at least three pages to the right, shift the pageStartRange to the right by 3 units
          let temporal_start_range = this.pageRangeStart + 3;
          temporal_start_range > 15
            ? (this.pageRangeStart = 15)
            : (this.pageRangeStart = temporal_start_range);
        }

        // 'push' page to right by 1 unit
        this.$router.push({
          name: "People",
          params: { page: this.currentPage + 1 },
        });
      }
    },
  },
};
</script>

<style scoped>
.paginator {
  display: flex;
  align-items: center;
  background: #fff;
  position: relative;
  padding: 15px 30px;
  margin-top: auto;
}

.page-ratio {
  font-size: 0.9rem;
  font-weight: 600;
  color: #113255;
  width: 100%;
}

.page-control {
  display: flex;
  width: 280px;
  height: 100%;
  align-items: center;
  position: absolute;
  inset: 0;
  margin: auto;
  padding: 0 15px;
}

.pages {
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: space-between;
}

.pages a {
  font-size: 0.75rem;
  font-weight: 600;
  color: #113255;
  transition: background ease-in-out 0.25s;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.pages a:hover {
  background: #e5e5e5;
}

a.active-page {
  background: #d5d5d5;
  color: #554e11;
}

.left-caret,
.right-caret {
  cursor: pointer;
  transition: transform ease-in-out 0.3s;
}

.left-caret:hover,
.right-caret:hover {
  filter: brightness(0.9);
  transform: scale(1.2);
}

.left-caret {
  margin-right: 20px;
}

.right-caret {
  margin-left: 20px;
}

@media screen and (max-width: 600px) {
  .paginator {
    padding: 10px;
  }

  .page-control {
    margin: 0 0 0 auto;
  }
}
</style>

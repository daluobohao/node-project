<template>
	<main class="sheet">
		<p class="eyebrow">Vue 3 · 组合式 API</p>
		<h1>一张还没写完的清单</h1>
		<p class="lead">
			这是放在
			<code>src/vue-demo</code>
			里的独立示例。输入事项、勾选、切换筛选，数据都留在当前页面里。
		</p>

		<form class="composer" @submit.prevent="addTask">
			<label class="sr" for="draft">新事项</label>
			<input
				id="draft"
				v-model="draft"
				type="text"
				placeholder="写下一件要做的事"
				autocomplete="off"
			/>
			<button type="submit">记下</button>
		</form>

		<div class="meta">
			<strong>{{remaining}}</strong>
			<span>件未完成</span>
			<div class="filters" role="tablist">
				<button
					type="button"
					:class="{ on: filter === 'all' }"
					@click="filter = 'all'"
				>
					全部
				</button>
				<button
					type="button"
					:class="{ on: filter === 'open' }"
					@click="filter = 'open'"
				>
					未完成
				</button>
				<button
					type="button"
					:class="{ on: filter === 'done' }"
					@click="filter = 'done'"
				>
					已完成
				</button>
			</div>
		</div>

		<ul v-if="visibleTasks.length" class="list">
			<TaskItem
				v-for="task in visibleTasks"
				:key="task.id"
				:task="task"
				@toggle="toggleTask"
				@remove="removeTask"
			/>
		</ul>
		<p v-else class="empty">这一栏是空的。</p>
	</main>
</template>

<style>
:root {
	--ink: #1c1712;
	--muted: #6f6458;
	--paper: #f3ecdf;
	--card: #fffaf3;
	--line: #e2d5c3;
	--accent: #b8431f;
	--accent-ink: #fff7f2;
	color-scheme: light;
	font-family: Outfit, "PingFang SC", sans-serif;
}
* {
	box-sizing: border-box;
}
body {
	margin: 0;
	min-height: 100vh;
	background:
		radial-gradient(
			circle at 12% 8%,
			rgb(184, 67, 31, 0.14),
			transparent 28%
		),
		linear-gradient(180deg, #f7f1e6 0%, var(--paper) 40%, #efe4d2 100%);
	color: var(--ink);
}
#app {
	display: grid;
	padding: 48px 20px;
	min-height: 100vh;
	place-items: center;
}
.sheet {
	padding: 36px 36px 28px;
	border: 1px solid var(--line);
	border-radius: 28px;
	width: min(640px, 100%);
	background: var(--card);
	box-shadow: 0 24px 60px rgb(70, 42, 18, 0.08);
}
.eyebrow {
	margin: 0 0 10px;
	text-transform: uppercase;
	font-size: 12px;
	color: var(--accent);
	letter-spacing: 0.16em;
}
h1 {
	margin: 0;
	line-height: 1.05;
	font-family: Fraunces, "Songti SC", serif;
	font-weight: 560;
	font-size: 48px;
}
.lead {
	margin: 14px 0 0;
	max-width: 38em;
	line-height: 1.6;
	color: var(--muted);
}
code {
	font-family: SFMono-Regular, ui-monospace, monospace;
	font-size: 0.92em;
}
.composer {
	display: flex;
	gap: 10px;
	margin-top: 28px;
}
.composer input {
	flex: 1;
	padding: 0 16px;
	border: 1px solid var(--line);
	border-radius: 14px;
	min-width: 0;
	height: 48px;
	background: #fff;
	font: inherit;
	color: var(--ink);
}
button {
	cursor: pointer;
	font: inherit;
}
.composer button {
	padding: 0 18px;
	border: 0;
	border-radius: 14px;
	height: 48px;
	background: var(--accent);
	color: var(--accent-ink);
}
.meta {
	display: flex;
	align-items: baseline;
	gap: 8px;
	margin-top: 26px;
}
.meta strong {
	font-family: Fraunces, serif;
	font-size: 32px;
}
.filters {
	display: flex;
	gap: 6px;
	margin-left: auto;
}
.filters button,
.row button {
	border: 0;
	background: transparent;
	color: var(--muted);
}
.filters button {
	padding: 6px 10px;
	border-radius: 999px;
}
.filters button.on {
	background: #f3e2d4;
	color: var(--ink);
}
.list {
	list-style: none;
	margin: 18px 0 0;
	padding: 0;
}
.empty {
	margin: 28px 0 8px;
	color: var(--muted);
}
.sr {
	overflow: hidden;
	position: absolute;
	width: 1px;
	height: 1px;
	/* stylelint-disable-next-line property-no-deprecated */
	clip: rect(0 0 0 0);
}
@media (width <= 640px) {
	.sheet {
		padding: 28px 20px 20px;
	}
	h1 {
		font-size: 36px;
	}
	.composer,
	.meta {
		flex-wrap: wrap;
	}
	.filters {
		margin-left: 0;
		width: 100%;
	}
}
</style>

<script setup>
import { computed, ref } from "vue";
import TaskItem from "./components/TaskItem.vue";

const draft = ref("");
const filter = ref("all");
const tasks = ref([
	{ done: true, id: 1, text: "看一眼单文件组件" },
	{ done: false, id: 2, text: "改一条响应式数据" },
	{ done: false, id: 3, text: "把未完成的事项勾掉" }
]);

const nextId = ref(4);
const remaining = computed(() => tasks.value.filter(task => !task.done).length);
const visibleTasks = computed(() => {
	if (filter.value === "open") return tasks.value.filter(task => !task.done);
	if (filter.value === "done") return tasks.value.filter(task => task.done);
	return tasks.value;
});

function addTask() {
	const text = draft.value.trim();
	if (!text) return;
	tasks.value.unshift({ done: false, id: nextId.value, text });
	nextId.value += 1;
	draft.value = "";
	filter.value = "all";
}

function toggleTask(id) {
	const task = tasks.value.find(item => item.id === id);
	if (task) task.done = !task.done;
}

function removeTask(id) {
	tasks.value = tasks.value.filter(task => task.id !== id);
}
</script>
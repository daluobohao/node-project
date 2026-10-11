<template>
	<li class="row">
		<label>
			<input
				type="checkbox"
				:checked="task.done"
				@change="$emit('toggle', task.id)"
			/>
			<span :class="{ done: task.done }">{{task.text}}</span>
		</label>
		<button type="button" @click="$emit('remove', task.id)">删除</button>
	</li>
</template>

<style scoped>
.row {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px 0;
	border-top: 1px solid var(--line);
}
label {
	display: flex;
	align-items: center;
	flex: 1;
	gap: 12px;
	min-width: 0;
}
input {
	width: 18px;
	height: 18px;
	accent-color: var(--accent);
}
span {
	line-height: 1.4;
}
.done {
	text-decoration: line-through;
	color: var(--muted);
}
</style>

<script setup>
defineProps({
	task: {
		required: true,
		type: Object
	}
});

defineEmits(["toggle", "remove"]);
</script>
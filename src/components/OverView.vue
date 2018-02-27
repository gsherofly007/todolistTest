<template>
  <div>
    OverView
    <div>
      <h3>
      任务总览
      </h3>
      <el-row>
        <el-col>
          任务数/完成任务数:****
        </el-col>
        <h4>
          完成比例:*****
        </h4>
      </el-row>
      <el-row>
      <el-col>
        <h4>
          任务类别数:****
        </h4>
      </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
  export default{
      name:"OverView",
      // 你可以通过某个 Vue 实例/组件的实例选项 components 注册仅在其作用域中可用的组件：
      components:{},
      // 组件实例的作用域是孤立的。这意味着不能 (也不应该) 在子组件的模板内直接引用父组件的数据。父组件的数据需要通过 prop 才能下发到子组件中。
      props:{},
      // data 必须是函数。 data 表示的是引用值对象
      data() {

      },
      // 类型：{ [key: string]: string | Function | Object | Array }

      // 一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。
      watch:{},
      // 遍历 watch 对象的每一个属性。
      computed:{},
      // methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例
      methods:{

      },
      // 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
      created(){

      },
      // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
      // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
      //  注意 updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕
      updated(){

      }


  }
</script>



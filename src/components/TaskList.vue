<template>
  <div class="wrapper">
    <div class="task-header">
      <el-row>
        <el-col>
          任务列表
        </el-col>
        <el-col>
          <div class="btn-wrapper">
            <el-button @click="switchAddTaskType">添加任务类别1111</el-button>
            <!--<el-button size="small" icon="el-icon-plus" @click="switchAddTaskType">添加任务类别</el-button>-->

          </div>
        </el-col>
      </el-row>
    </div>
    <div class="task-content">
      <div class="null-info"  v-if="taskTypeLists.length === 0">
        请添加任务类别:待完成的任务在任务类别中添加
      </div>
      <div class="task-info" v-else>
        <el-collapse v-model="activeCollapse" @change="collapseChange">
          <el-collapse-item :title="taskType.doc.typeName" v-for="(taskType, index) in taskTypeLists" :key="index" :name="taskType.doc.typeName">
            <ul class="task-list">
              <li class="task-item tool-bar">
                <el-button size="mini" icon="el-icon-plus" type="primary" @click="switchAddTask(taskType.doc.typeName)">添加新任务</el-button>
              </li>
              <li class="task-item" v-for="(task, index) in taskItems[taskType.doc.typeName]" :key="index">
                <todo-task :task-doc="task.doc" @on-change="taskChange" @on-edit="taskEdit" @on-delete="taskDelete"></todo-task>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 放置窗口 -->
    <el-dialog title = "添加任务类别" :visible.sync="taskTypeVisible"
    >
      <el-form>
          <el-form-item label="任务类别" labelWidth="80">
            <el-input v-model="newTaskType" autoComplete="off" placeholder="请输入任务种类"></el-input>
          </el-form-item>
          <p class="info-warning">注:任务类别添加后无法再更改</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="switchAddTaskType">取消</el-button>
        <el-button type="primary" @click="addTastType">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加新任务" :visible.sync="taskVisible">
      <el-form>
        <el-form-item label="任务内容" label-width="80">
          <el-input v-model="newTask" auto-complete="off" placeholder="请输入新任务"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="switchAddTask">取 消</el-button>
        <el-button type="primary" @click="addTask">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  import PouchDB from 'pouchdb';

  import TodoTask from "./TodoTask.vue"
  import ElDialog from "../../node_modules/element-ui/packages/dialog/src/component";
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";

  var taskDB = new PouchDB("taskLists")
  var typeDb = new PouchDB("taskTypes")
  export default {
      name: "TaskList",
      components:{
        ElButton, ElInput, ElFormItem, ElForm, ElDialog, TodoTask
      },
      props:{},
      data() {
          return {
              taskTypeLists:[],
              taskTypeVisible:false,
              newTaskType:null,
              taskVisible:false,
              newTask: null,
              activeTaskType: null,
              taskItems: {},
              activeCollapse: []
          }
      },
      watch: {},
      computed:{},
      methods: {
        switchAddTaskType: function () {
          this.taskTypeVisible = !this.taskTypeVisible;
        }
        ,
        switchAddTask:function (taskType) {
        	this.taskVisible = !this.taskVisible;
        	this.activeTaskType = taskType;
        },
        collapseChange: function(activeNames) {
        	console.log("collapseChange")
        	console.log(activeNames)
          sessionStorage.setItem("activeCollapse", JSON.stringify(activeNames));
        },
//        添加任务类型
        addTastType: function () {
          console.log("添加任务类型");
          console.log(this.newTaskType);
          typeDb
            .get(this.newTaskType)
            .then(doc =>{
            	this.$message(
                {
                  message:"已存在相同类别",
                  type:"warning",
                  duration:1500,
                  onClose:() => {
                  	this.newTaskType = null;
                  }
                }
              );
            })
            .catch (err => {
            	typeDb
                .put({
                  _id: this.newTaskType,
                  typeName: this.newTaskType
                })
            	  .then(res => {
            	  	if (res.ok){
            	  		this.$message({
                      message:'新类别 $(this.newTaskType) 已经创建成功了',
                      type:"success",
                      duration:1500,
                      onClose: () => {
                      	this.$router.go(0);
                      }
                    });
                  }
                })
                .catch(err => {
                	 this.$message({
                	  	mesage: "新建类别出错",
                      type: "error",
                      duration: 1500
                	 });
                  });
          });

        },
//        添加任务
        addTask:function () {
        	  console.log("添加任务");
        	  console.log(this.newTask);
        	  console.log(this.activeTaskType);
          taskDB.put({
          	//_id: '${+new Date()}',
            _id: `${+ new Date()}`,
            task:this.newTask,
            status:false,
            type:this.activeTaskType
          }).then(res => {
          	  if (res.ok) {
          	  	this.$message({
                  message: ' $(this.activeTaskType) 添加成功',
                  type: "success",
                  duration:2500,
                  onClose:() => {
                  	 console.log("addTask 成功")
                      this.$router.go(0);
                  }
                  }
                );
              }
            }

            )
            .catch(err => {
            		this.$message({
                  message:"add Task 出错",
                  type:"Error",
                  duration:1500

                });
              }
            );
        },
        //任务变化
        taskChange: function(taskDoc) {
          // console.log(taskInfo);
          taskDB
            .put(
              {
                _rev: taskDoc._rev,
                _id: taskDoc._id,
                task: taskDoc.task,
                status: taskDoc.status,
                type: taskDoc.type
              },
              { force: true }
            )
            .then(res => {})
            .catch(err => {
              console.log(err);
              this.$message({
                message: "新建任务时出现错误",
                type: "error",
                duration: 1500
              });
            });
        },
        taskEdit:function (taskDoc) {


        },
        taskDelete:function (taskDoc) {

        }
      },
     mounted() {},
     created(){
      	// 获取任务类型列表
      	typeDb.allDocs(
          {
            include_docs:true
          }
        )
          .then(res => {
          	    console.log("TaskList 总数"+res.rows);
          	    this.taskTypeLists = res.rows;
            }
          )
          .catch(err => {
          	console.log(err);
          	this.$message({
              message:"获取任务类型的时候出错",
              type:"error",
              duration:1500
            })
          });
      	// 获取任务类型对应的任务列表
        console.log("初始化任务列表")
        taskDB.allDocs({
          include_docs: true
        })
          .then(res => {
          	  console.log(res);
          	  res.rows.forEach(task => {
          	  	//console.log(task)
          	  	if (!this.taskItems[task.doc.type]) {
                    console.log("不符合此类型")
                    console.log(task.doc.type)
                    if (task.doc.type) {
                       this.$set(this.taskItems, task.doc.type, [task]);
                    }
                } else {
          	  		console.log("符合此类型");
          	  		console.log(task);
                   this.taskItems[task.doc.type].push(task)
                }
              })
          })
     }
  }

</script>
<style lang="scss" scoped>
.wrapper {
  width: 90%;
  margin: 0 auto;
  .task-header {
    .btn-wrapper {
      margin-top: 1rem;
    }
  }
  .task-content {
    .null-info {
      margin-top: 2rem;
      text-align: center;
      font-weight: bold;
    }
    .task-info {
      width:100%;
      .task-list {
        list-style: none;
        .task-item {
            width:100%;
            padding: 0.5rem 0;
            border-bottom: 1px solid #ebeef5;
        }
      }
    }
  }
  .info-warning {
    color:#f56c6c;
  }
}
</style>

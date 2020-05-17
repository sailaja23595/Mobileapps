import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';
import {CheckBox, Card} from "react-native-elements";
import DatePicker from 'react-native-datepicker';
import Constants from 'expo-constants';


export default class TodoList extends Component{
  constructor(props) {
    super(props);
    this.state = {list: []}   
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }
  handleAddTask(task){
    console.log("add task clicked");
    this.state.list.push(task);
    this.setState({list: this.state.list})

  }
  handleDeleteTask(id) {
    console.log("delete task clicked");
    // console.log(id)
    let Nlist = this.state.list.filter(element => element.id !== id)
    this.setState({list: Nlist})
  }
  checkBox(index){
    console.log("Checkbox")
    let newArray = this.state.list;
    newArray[index].checked =  !newArray[index].checked;
    this.setState({list: newArray});
  }
  Lists(){
    return this.state.list.map((t,index) => {
      return (
        <View>
          <ScrollView>
          <CheckBox title = {t.name + "," + t.date}
          checked = {t.checked}
          onPress = {() => this.checkBox(index)}
          />
          <Button title = "Delete" onPress={() => this.handleDeleteTask(t.id)}/>
          </ScrollView>
        </View>
    
      )
    })

  } 

  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <View>
          <Text style={{textAlign : 'center'}}>ToDo List </Text>
          <TaskNameForm onAddTask = {this.handleAddTask}/>
        </View>
        <View>
          <Card>
          <Text style = {{textAlign : 'center',width: 300,height:40, color:'darkblue'}}>LISTS </Text>
          <ScrollView>{this.Lists()}</ScrollView>
          </Card>
        </View>
      </SafeAreaView>
    )
  }
}

export class TaskNameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleDate = this.handleDate.bind(this);
    }

    handleSubmit(event) {
      const taskList = this.props.taskList;
      // create a task object
      event.preventDefault();
      const task = {id:Date.now(), name: this.state.TextInputValue, 
      dueDate: new Date(), date : this.state.date,checked: false};
      // add the task object to the task list
      this.props.onAddTask(task);
      this.setState({TextInputValue:'', date:''})
    }

    handleChange(event) {
      // code to set the state of the component
      this.setState({TextInputValue:event});
    }
  
  
    render() {
      return(
        <View style = {styles.container}>
          <Card title = "ToDoApp">
          <TextInput 
          style={{ height: 40, borderColor: 'black', borderWidth: 1 }} 
          placeholder={"Enter Task"} value = {this.state.TextInputValue} 
          onChangeText = {this.handleChange}
          />
          <DatePicker 
            style={{width: 300}}
            date={this.state.date} 
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
          <Button 
          title = "Add" 
          onPress = {this.handleSubmit}/>
          
          </Card>
    
        </View>

      )
    }
 }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
    paddingTop:100,
    marginHorizontal: 6,

  },
});

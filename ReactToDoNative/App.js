import React,{Component} from 'react';
import Constants from 'expo-constants'; 
import { StyleSheet, Text, View, TextInput, Button, ScrollView, SafeAreaView } from 'react-native';
import {CheckBox} from "react-native-elements";
import DatePicker from 'react-native-datepicker';

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
          <Text style = {{textAlign : 'center'}}>Lists </Text>
          <ScrollView>{this.Lists()}</ScrollView>
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
        <View>
          <TextInput 
          style={{ height: 40, borderColor: 'black', borderWidth: 1 }} 
          placeholder={"Enter Task"} value = {this.state.TextInputValue} 
          onChangeText = {this.handleChange}
          />
          <DatePicker 
            style={{width: 300}}
            date={this.state.date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2020"
            maxDate="01-01-2035"
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
        </View>

      )
    }
 }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginHorizontal: 16,
    


  },
});



//   onSubmit = () => {
//     if(this.state.title.length > 0) this.props.onAdd(this.state);
//     return null;
//   };
//   setStateUtil = (property, value = undefined) => {
//     this.setState({
//       [property]: value,
//     });
//   };
//   render() {
//     const { title, completed } = this.state;
//     const { onBlur } = this.props;
//     return (
//       <View
//         style={{
//           flex: 1,
//           width: '100%',
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingRight: 10,
//           paddingBottom: 5,
//           paddingTop: 5,
//         }}
//       >
//         <CheckBox checked={completed} onPress={() => this.setStateUtil('completed', !completed)} />
//         <Body
//           style={{
//             flex: 1,
//             justifyContent: 'flex-start',
//             alignItems: 'flex-start',
//             paddingLeft: 25,
//           }}
//         >
//           <TextInput
//             style={{ width: '90%' }}
//             placeholder="Add the items here.."
//             autoFocus
//             underLineColorAndroid="transparent"
//             underlineColor="transparent"
//             blurOnSubmit
//             onSubmitEditing={this.onSubmit}
//             onChangeText={changedTitle => this.setStateUtil('title', changedTitle)}
//             value={title}
//             autoCorrect={false}
//             autoCapitalize="none"
//             onBlur={onBlur}
//           />
//           </Body>
//           <TouchableOpacity
//           onPress={() => this.props.onCancelDelete}
//           style={{ paddingLeft: 25, paddingRight: 15 }}
//           >
//           <Ionicons
//             name="ios-trash-outline"
//             color={`${title.length > 0 ? 'black' : 'grey'}`}
//             size={23}
//           />
//           </TouchableOpacity>
//       </View>
//       );
//     }

// }
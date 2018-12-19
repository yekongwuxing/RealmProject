/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import RealmBase from "./Realm";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: []
    };
  }
  componentDidMount() {
    let data = [
      { id: 100, title: "连帽运动训练卫衣", mall: "京东商城" },
      { id: 101, title: "连帽套头衫", mall: "天猫" },
      { id: 102, title: "黑白奥利奥", mall: "京东商城" },
      {
        id: 103,
        title: "2018冬季新款羊皮女包单肩包手提时尚气质女包大容量休闲OL潮流包",
        mall: "天猫"
      },
      { id: 104, title: "黛维莉 香水沐浴露1000ml家庭装", mall: "京东商城" }
    ];
    //先删除
    RealmBase.removeAllData("HomeData");
    //后添加
    RealmBase.create("HomeData", data);
    let dataList = RealmBase.loadAll("HomeData");
    this.setState({
      dataList: dataList
    });
  }
  loadAll() {
    let dataList = RealmBase.loadAll("HomeData");
    this.setState({
      dataList: dataList
    });
  }
  searchData(filtered) {
    let dataList = RealmBase.filtered("HomeData", filtered);
    this.setState({
      dataList: dataList
    });
  }

  updateData(data) {
    RealmBase.updateData("HomeData", data);
    this.loadAll();
  }
  removeData(filtered) {
    RealmBase.removeData("HomeData", filtered);
    this.loadAll();
  }

  removeAllData() {
    RealmBase.removeAllData("HomeData");
    this.loadAll();
  }
  renderItem = ({ item }) => {
    return (
      <View style={{ height: 60, justifyContent: "center" }}>
        <Text style={{ marginHorizontal: 15 }}>{item.title}</Text>
        <Text style={{ marginHorizontal: 15, color: "red", marginTop: 10 }}>
          来自：{item.mall}
        </Text>
      </View>
    );
  };
  itemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: "#e5e5e5" }} />;
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 24, height: 400 }}>
          <FlatList
            extraData={this.state}
            data={this.state.dataList}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.itemSeparator}
          />
        </View>
        <View style={styles.welcome}>
          <TouchableOpacity
            style={{ height: 30 }}
            onPress={() => this.loadAll()}
          >
            <Text style={styles.instructions}>默认是全部数据</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 30 }}
            onPress={() => this.searchData('mall="天猫"')}
          >
            <Text style={styles.instructions}>查询列表中数据来自天猫的</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginVertical: 10, borderWidth: 1 }}
            onPress={() => this.searchData("mall CONTAINS '京' ")}
          >
            <Text style={styles.instructions}>
              模糊查询数据mall带有京的数据
            </Text>
            <Text style={styles.instructions}>
              模糊查询BEGINSWITH：开头,ENDSWITH：结尾和CONTAINS：包含
              等等条件查询
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 30 }}
            onPress={() => this.updateData({ id: 102, mall: "淘宝" })}
          >
            <Text style={styles.instructions}>
              修改某一条数据信息(把id=102的改成来自淘宝)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 30 }}
            onPress={() => this.removeData("id = 102")}
          >
            <Text style={styles.instructions}>删除表中某一条数据(id=102)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 30 }}
            onPress={() => this.removeAllData()}
          >
            <Text style={styles.instructions}>删除表中全部数据</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    marginTop: 10
  },
  instructions: {
    textAlign: "center",
    fontSize: 16,
    color: "#333333"
  }
});

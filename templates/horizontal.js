import React, { Component } from "react";
import { FlatList, Text, StyleSheet, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { Card, CardItem, Container, Content } from "native-base";
import Carousel, { Pagination } from 'react-native-snap-carousel';

const width = Dimensions.get('window').width;
const height = (width / 2) + 55

const data = [
  {
    imageUrl: "1532090428_annonce.png",
    title: "something"
  },
  {
    imageUrl: "1532102640_annonce.jpg",
    title: "something two"
  },
  {
    imageUrl: "1532090428_annonce.png",
    title: "something three"
  },
  {
    imageUrl: "1532090463_annonce.jpg",
    title: "something four"
  },
  {
    imageUrl: "1532090428_annonce.png",
    title: "something five"
  },
  {
    imageUrl: "image_463215.png",
    title: "something six"
  }
];

export default class horizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      viewport: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        },
        activeSlide:0
    };
  }

  _renderItem(data, index){
    // console.warn(item)
    const img = 'https://ohome.easywebmobile.fr/public/img/annonces/'+data.item.imageUrl
    return (
      
          <View style ={{padding:5}} >
            <Card style = {{borderWidth:3, borderColor:'red', borderRadius:10}} >
                <View containerStyle={{ padding: 0, width: 160 }}>
                <TouchableOpacity style = {{alignItems:'center', borderRadius:10, zIndex:455}} >
                    <Image 
                      style = {styles.img} 
                      source = {{uri:img}}
                      resizeMode="cover"
                     />
                </TouchableOpacity>
                <CardItem>
                  <View style = {{flexDirection:'row'}} >
                    <View style = {{width:'50%'}} >
                      <Text style={{ marginBottom: 10 }}>
                        {data.item.title}
                      </Text>
                    </View>

                    <View style = {{width:'50%'}} >
                      <Text style={{ marginBottom: 10, textAlign:'right' }}>
                        {data.item.title}
                      </Text>
                    </View>
                  </View>
                </CardItem>
                </View>
            </Card>
          </View>
      
    );
  }

  slide(index){
    this.setState({ activeSlide: index })
    // console.warn(this.state.activeSlide)
  }

      get pagination () {
        const { data, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={data.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

  render() {
    return (
      <Container>
        <Content>
          <View>
          <Carousel
            ref={(c) => {this._carousel = c;}}
            data={this.state.data}
            renderItem={this._renderItem}
            sliderWidth={this.state.viewport.width}
            itemWidth={this.state.viewport.width -50 }
            onSnapToItem={(index) => this.slide(index)}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          />
          </View>
          { this.pagination }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  img:{
    width:width -15,
    height:height,
    zIndex:10
    /*borderTopLeftRadius:50,
    borderTopRightRadius:50*/
  }
})
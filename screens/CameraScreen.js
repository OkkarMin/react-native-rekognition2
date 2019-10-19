import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  Dimensions,
  StyleSheet
} from 'react-native'
import { Overlay } from 'react-native-elements'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import * as ImageManipulator from 'expo-image-manipulator'

import CameraGallery from '../components/CameraGallery'
import CameraToolbar from '../components/CameraToolbar'
import { detectFacesFromAWSCollection } from '../utils/utils'
import Colors from '../constants/Colors'

const { width: winWidth, height: winHeight } = Dimensions.get('window')

export default class CameraPage extends React.Component {
  static navigationOptions = {
    header: null
  }
  camera = null

  state = {
    ratio: '4:3',
    captures: [],
    detecting: false,
    capturing: null,
    hasCameraPermission: null,
    cameraType: Camera.Constants.Type.front,
    flashMode: Camera.Constants.FlashMode.off
  }

  setFlashMode = flashMode => this.setState({ flashMode })
  setCameraType = cameraType => this.setState({ cameraType })
  handleCaptureIn = () => this.setState({ capturing: true })

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording()
  }

  handleShortCapture = async () => {
    const photo = await this.camera.takePictureAsync()
    const resizedPhoto = await ImageManipulator.manipulateAsync(photo.uri, [], {
      compress: 0,
      format: 'jpeg',
      base64: true
    })

    this.setState({
      capturing: false,
      captures: [resizedPhoto, ...this.state.captures]
    })
  }

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync()
    this.setState({
      capturing: false,
      captures: [videoData, ...this.state.captures]
    })
  }

  detectFacesFromCaptures = async collectionName => {
    let result = []

    this.setState({ detecting: true })

    await Promise.all(
      this.state.captures.map(async image => {
        let response = await detectFacesFromAWSCollection(
          collectionName,
          image['base64']
        )

        response.map(each => result.push(each))
      })
    )

    this.setState({ captures: [], detecting: false })
    console.log(result)
  }

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA)
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    const hasCameraPermission =
      camera.status === 'granted' && audio.status === 'granted'

    this.setState({ hasCameraPermission })

    if (Platform.OS === 'android') {
      let ratioArray = await this.camera.getSupportedRatiosAsync()
      let ratio = ratioArray[ratioArray.length - 1]

      this.setState({ ratio })
    }
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures,
      detecting,
      ratio
    } = this.state

    const { navigation } = this.props
    const collectionName = navigation.state.params['collectionName']

    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>
    }

    return (
      <React.Fragment>
        <View>
          <Overlay
            isVisible={detecting}
            windowBackgroundColor="rgba(255, 255, 255, .9)"
            overlayBackgroundColor="rgba(0,0,0,.6)"
            width="auto"
            height="auto"
          >
            <React.Fragment>
              <Text style={styles.overlayText}>Updating Attendance</Text>
              <ActivityIndicator size="large" color="white" />
            </React.Fragment>
          </Overlay>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={camera => (this.camera = camera)}
            ratio={ratio}
          />
        </View>

        {/* For Gallery Preview */}
        {captures.length > 0 && (
          <CameraGallery
            captures={captures}
            collectionEndpoint={collectionName}
            onCheckMarkPress={this.detectFacesFromCaptures}
          />
        )}

        <CameraToolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  overlayText: { fontSize: 20, marginBottom: 10, color: Colors.text }
})

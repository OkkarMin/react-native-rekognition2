import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'

import CameraToolbar from '../components/CameraToolbar'

const { width: winWidth, height: winHeight } = Dimensions.get('window')

export default class CameraPage extends React.Component {
  static navigationOptions = {
    header: null
  }
  camera = null

  state = {
    captures: [],
    capturing: null,
    hasCameraPermission: null,
    cameraType: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off
  }

  setFlashMode = flashMode => this.setState({ flashMode })
  setCameraType = cameraType => this.setState({ cameraType })
  handleCaptureIn = () => this.setState({ capturing: true })

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording()
  }

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync({ base64: true })
    this.setState({
      capturing: false,
      captures: [photoData, ...this.state.captures]
    })
  }

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync()
    this.setState({
      capturing: false,
      captures: [videoData, ...this.state.captures]
    })
  }

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA)
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    const hasCameraPermission =
      camera.status === 'granted' && audio.status === 'granted'

    this.setState({ hasCameraPermission })
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures
    } = this.state

    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>
    }

    return (
      <React.Fragment>
        <View>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={camera => (this.camera = camera)}
          />
        </View>

        {/* For Gallery Preview */}
        {/* {captures.length > 0 && <Gallery captures={captures} />} */}

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
  }
})

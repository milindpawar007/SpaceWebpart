import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'SpaceWebPartStrings';
import Space from './components/Space';
import { ISpaceProps } from './components/ISpaceProps';

export interface ISpaceWebPartProps {
  description: string;
}

export default class SpaceWebPart extends BaseClientSideWebPart<ISpaceWebPartProps> {



  public render(): void {
    const element: React.ReactElement<ISpaceProps> = React.createElement(
      Space,
      {
       
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
   return Promise.resolve()
  }




  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

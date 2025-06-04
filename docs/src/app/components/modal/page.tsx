'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function ModalPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>Modal</h1>
        <p>
          Modals are dialog boxes or popup windows that are displayed on top of the current page.
          They are used to show important information, gather user input, or require user confirmation before proceeding with an action.
        </p>

        <ComponentDemo
          title="Basic Modal"
          description="Simple modal with header, body, and footer"
          code={`<div className="c-modal-example">
  {/* Modal trigger button */}
  <button className="c-btn c-btn--primary" data-toggle="modal" data-target="#exampleModal">
    Launch demo modal
  </button>
  
  {/* Modal structure */}
  <div className="c-modal" id="exampleModal" tabIndex="-1" role="dialog">
    <div className="c-modal__dialog" role="document">
      <div className="c-modal__content">
        <div className="c-modal__header">
          <h5 className="c-modal__title">Modal title</h5>
          <button type="button" className="c-modal__close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="c-modal__body">
          <p>Modal body text goes here. This is the main content area of the modal.</p>
        </div>
        <div className="c-modal__footer">
          <button type="button" className="c-btn c-btn--secondary" data-dismiss="modal">Close</button>
          <button type="button" className="c-btn c-btn--primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="c-modal-example">
            {/* Modal trigger button */}
            <button className="c-btn c-btn--primary" data-toggle="modal" data-target="#exampleModal">
              Launch demo modal
            </button>
            
            {/* Modal structure */}
            <div className="c-modal" id="exampleModal" tabIndex={-1} role="dialog">
              <div className="c-modal__dialog" role="document">
                <div className="c-modal__content">
                  <div className="c-modal__header">
                    <h5 className="c-modal__title">Modal title</h5>
                    <button type="button" className="c-modal__close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="c-modal__body">
                    <p>Modal body text goes here. This is the main content area of the modal.</p>
                  </div>
                  <div className="c-modal__footer">
                    <button type="button" className="c-btn c-btn--secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="c-btn c-btn--primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Modal Sizes"
          description="Modals in different sizes"
          code={`<div className="c-modal-example">
  <div className="u-d-flex u-gap-md">
    <button className="c-btn c-btn--primary" data-toggle="modal" data-target="#smallModal">
      Small modal
    </button>
    <button className="c-btn c-btn--primary" data-toggle="modal" data-target="#defaultModal">
      Default modal
    </button>
    <button className="c-btn c-btn--primary" data-toggle="modal" data-target="#largeModal">
      Large modal
    </button>
  </div>
  
  {/* Small Modal */}
  <div className="c-modal" id="smallModal" tabIndex="-1" role="dialog">
    <div className="c-modal__dialog c-modal__dialog--sm" role="document">
      <div className="c-modal__content">
        <div className="c-modal__header">
          <h5 className="c-modal__title">Small Modal</h5>
          <button type="button" className="c-modal__close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="c-modal__body">
          <p>This is a small modal dialog.</p>
        </div>
        <div className="c-modal__footer">
          <button type="button" className="c-btn c-btn--secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  {/* Default Modal */}
  <div className="c-modal" id="defaultModal" tabIndex="-1" role="dialog">
    <div className="c-modal__dialog" role="document">
      <div className="c-modal__content">
        <div className="c-modal__header">
          <h5 className="c-modal__title">Default Modal</h5>
          <button type="button" className="c-modal__close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="c-modal__body">
          <p>This is a default size modal dialog.</p>
        </div>
        <div className="c-modal__footer">
          <button type="button" className="c-btn c-btn--secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  {/* Large Modal */}
  <div className="c-modal" id="largeModal" tabIndex="-1" role="dialog">
    <div className="c-modal__dialog c-modal__dialog--lg" role="document">
      <div className="c-modal__content">
        <div className="c-modal__header">
          <h5 className="c-modal__title">Large Modal</h5>
          <button type="button" className="c-modal__close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="c-modal__body">
          <p>This is a large modal dialog.</p>
        </div>
        <div className="c-modal__footer">
          <button type="button" className="c-btn c-btn--secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="c-modal-example">
            <div className="u-d-flex u-gap-md">
              <button className="c-btn c-btn--primary" data-toggle="modal" data-target="#smallModal">
                Small modal
              </button>
              <button className="c-btn c-btn--primary" data-toggle="modal" data-target="#defaultModal">
                Default modal
              </button>
              <button className="c-btn c-btn--primary" data-toggle="modal" data-target="#largeModal">
                Large modal
              </button>
            </div>
            
            {/* Small Modal */}
            <div className="c-modal" id="smallModal" tabIndex={-1} role="dialog">
              <div className="c-modal__dialog c-modal__dialog--sm" role="document">
                <div className="c-modal__content">
                  <div className="c-modal__header">
                    <h5 className="c-modal__title">Small Modal</h5>
                    <button type="button" className="c-modal__close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="c-modal__body">
                    <p>This is a small modal dialog.</p>
                  </div>
                  <div className="c-modal__footer">
                    <button type="button" className="c-btn c-btn--secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Default Modal */}
            <div className="c-modal" id="defaultModal" tabIndex={-1} role="dialog">
              <div className="c-modal__dialog" role="document">
                <div className="c-modal__content">
                  <div className="c-modal__header">
                    <h5 className="c-modal__title">Default Modal</h5>
                    <button type="button" className="c-modal__close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="c-modal__body">
                    <p>This is a default size modal dialog.</p>
                  </div>
                  <div className="c-modal__footer">
                    <button type="button" className="c-btn c-btn--secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Large Modal */}
            <div className="c-modal" id="largeModal" tabIndex={-1} role="dialog">
              <div className="c-modal__dialog c-modal__dialog--lg" role="document">
                <div className="c-modal__content">
                  <div className="c-modal__header">
                    <h5 className="c-modal__title">Large Modal</h5>
                    <button type="button" className="c-modal__close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="c-modal__body">
                    <p>This is a large modal dialog.</p>
                  </div>
                  <div className="c-modal__footer">
                    <button type="button" className="c-btn c-btn--secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Modal with Scrolling Content"
          description="Modal with scrollable body content"
          code={`<div className="c-modal-example">
  <button className="c-btn c-btn--primary" data-toggle="modal" data-target="#scrollingModal">
    Modal with scrolling content
  </button>
  
  <div className="c-modal" id="scrollingModal" tabIndex="-1" role="dialog">
    <div className="c-modal__dialog" role="document">
      <div className="c-modal__content">
        <div className="c-modal__header">
          <h5 className="c-modal__title">Scrolling Modal</h5>
          <button type="button" className="c-modal__close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="c-modal__body">
          <p>This modal has a lot of content that will scroll within the modal body.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius faucibus massa sollicitudin amet augue. Nibh metus a semper purus mauris duis. Lorem eu neque, tristique quis duis. Nibh scelerisque ac adipiscing velit non nulla in amet pellentesque.</p>
          <p>Sit turpis pretium eget maecenas. Vestibulum dolor mattis consectetur eget commodo vitae. Amet pellentesque sit pulvinar lorem mi a, euismod risus rhoncus. Elementum ullamcorper nec, habitasse vulputate. Eget dictum quis est sed egestas tellus, a lectus. Quam ullamcorper in fringilla arcu aliquet fames arcu.</p>
          <p>Molestie neque nullam scelerisque amet rutrum eu sit. A vitae velit in venenatis. Suspendisse neque arcu venenatis dolor. Rhoncus nullam enim elementum, tristique habitant nibh tempor ut. Aenean vitae cras ornare non proin senectus. Nulla faucibus ultrices aliquet natoque. Enim nec enim nunc nunc, ut. Sed ut diam nascetur faucibus malesuada facilisis.</p>
          <p>Sit turpis pretium eget maecenas. Vestibulum dolor mattis consectetur eget commodo vitae. Amet pellentesque sit pulvinar lorem mi a, euismod risus rhoncus. Elementum ullamcorper nec, habitasse vulputate. Eget dictum quis est sed egestas tellus, a lectus. Quam ullamcorper in fringilla arcu aliquet fames arcu.</p>
          <p>Molestie neque nullam scelerisque amet rutrum eu sit. A vitae velit in venenatis. Suspendisse neque arcu venenatis dolor. Rhoncus nullam enim elementum, tristique habitant nibh tempor ut. Aenean vitae cras ornare non proin senectus. Nulla faucibus ultrices aliquet natoque. Enim nec enim nunc nunc, ut. Sed ut diam nascetur faucibus malesuada facilisis.</p>
        </div>
        <div className="c-modal__footer">
          <button type="button" className="c-btn c-btn--secondary" data-dismiss="modal">Close</button>
          <button type="button" className="c-btn c-btn--primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="c-modal-example">
            <button className="c-btn c-btn--primary" data-toggle="modal" data-target="#scrollingModal">
              Modal with scrolling content
            </button>
            
            <div className="c-modal" id="scrollingModal" tabIndex={-1} role="dialog">
              <div className="c-modal__dialog" role="document">
                <div className="c-modal__content">
                  <div className="c-modal__header">
                    <h5 className="c-modal__title">Scrolling Modal</h5>
                    <button type="button" className="c-modal__close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="c-modal__body">
                    <p>This modal has a lot of content that will scroll within the modal body.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius faucibus massa sollicitudin amet augue. Nibh metus a semper purus mauris duis. Lorem eu neque, tristique quis duis. Nibh scelerisque ac adipiscing velit non nulla in amet pellentesque.</p>
                    <p>Sit turpis pretium eget maecenas. Vestibulum dolor mattis consectetur eget commodo vitae. Amet pellentesque sit pulvinar lorem mi a, euismod risus rhoncus. Elementum ullamcorper nec, habitasse vulputate. Eget dictum quis est sed egestas tellus, a lectus. Quam ullamcorper in fringilla arcu aliquet fames arcu.</p>
                    <p>Molestie neque nullam scelerisque amet rutrum eu sit. A vitae velit in venenatis. Suspendisse neque arcu venenatis dolor. Rhoncus nullam enim elementum, tristique habitant nibh tempor ut. Aenean vitae cras ornare non proin senectus. Nulla faucibus ultrices aliquet natoque. Enim nec enim nunc nunc, ut. Sed ut diam nascetur faucibus malesuada facilisis.</p>
                    <p>Sit turpis pretium eget maecenas. Vestibulum dolor mattis consectetur eget commodo vitae. Amet pellentesque sit pulvinar lorem mi a, euismod risus rhoncus. Elementum ullamcorper nec, habitasse vulputate. Eget dictum quis est sed egestas tellus, a lectus. Quam ullamcorper in fringilla arcu aliquet fames arcu.</p>
                    <p>Molestie neque nullam scelerisque amet rutrum eu sit. A vitae velit in venenatis. Suspendisse neque arcu venenatis dolor. Rhoncus nullam enim elementum, tristique habitant nibh tempor ut. Aenean vitae cras ornare non proin senectus. Nulla faucibus ultrices aliquet natoque. Enim nec enim nunc nunc, ut. Sed ut diam nascetur faucibus malesuada facilisis.</p>
                  </div>
                  <div className="c-modal__footer">
                    <button type="button" className="c-btn c-btn--secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="c-btn c-btn--primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <h2>Props</h2>
        <table className="c-data-table">
          <thead className="c-data-table__header">
            <tr className="c-data-table__row">
              <th className="c-data-table__header-cell">Class</th>
              <th className="c-data-table__header-cell">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal</code></td>
              <td className="c-data-table__cell">Main container for the modal component</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal__dialog</code></td>
              <td className="c-data-table__cell">Container for the modal content</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal__dialog--sm</code></td>
              <td className="c-data-table__cell">Small modal size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal__dialog--lg</code></td>
              <td className="c-data-table__cell">Large modal size</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal__content</code></td>
              <td className="c-data-table__cell">Container for modal header, body, and footer</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal__header</code></td>
              <td className="c-data-table__cell">Container for modal title and close button</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal__title</code></td>
              <td className="c-data-table__cell">Modal title text</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal__close</code></td>
              <td className="c-data-table__cell">Close button for the modal</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal__body</code></td>
              <td className="c-data-table__cell">Container for the main modal content</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal__footer</code></td>
              <td className="c-data-table__cell">Container for modal action buttons</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal--centered</code></td>
              <td className="c-data-table__cell">Centers the modal vertically in the viewport</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>c-modal--scrollable</code></td>
              <td className="c-data-table__cell">Allows scrolling within the modal body</td>
            </tr>
            <tr className="c-data-table__row">
              <td className="c-data-table__cell"><code>is-active</code></td>
              <td className="c-data-table__cell">State class to show the modal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsLayout>
  )
}
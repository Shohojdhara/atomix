'use client'

import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import { ComponentDemo } from '@/components/ComponentDemo'

export default function DatePickerPage() {
  return (
    <DocsLayout>
      <div className="u-d-block">
        <h1>DatePicker</h1>
        <p>
          The DatePicker component allows users to select a date from a calendar interface. 
          It provides an intuitive way to input dates in forms and applications.
        </p>

        <ComponentDemo
          title="Basic Usage"
          description="Default date picker with a simple calendar interface"
          code={`<div className="c-datepicker">
  <div className="c-datepicker__input-wrapper">
    <input 
      type="text" 
      className="c-datepicker__input" 
      placeholder="Select date" 
      value="2023-10-15" 
      readOnly 
    />
    <button className="c-datepicker__toggle">
      <i className="fas fa-calendar"></i>
    </button>
  </div>
  <div className="c-datepicker__calendar">
    <div className="c-datepicker__header">
      <button className="c-datepicker__nav c-datepicker__nav--prev">
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="c-datepicker__title">October 2023</div>
      <button className="c-datepicker__nav c-datepicker__nav--next">
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
    <div className="c-datepicker__weekdays">
      <div className="c-datepicker__weekday">Su</div>
      <div className="c-datepicker__weekday">Mo</div>
      <div className="c-datepicker__weekday">Tu</div>
      <div className="c-datepicker__weekday">We</div>
      <div className="c-datepicker__weekday">Th</div>
      <div className="c-datepicker__weekday">Fr</div>
      <div className="c-datepicker__weekday">Sa</div>
    </div>
    <div className="c-datepicker__days">
      <button className="c-datepicker__day c-datepicker__day--outside">24</button>
      <button className="c-datepicker__day c-datepicker__day--outside">25</button>
      <button className="c-datepicker__day c-datepicker__day--outside">26</button>
      <button className="c-datepicker__day c-datepicker__day--outside">27</button>
      <button className="c-datepicker__day c-datepicker__day--outside">28</button>
      <button className="c-datepicker__day c-datepicker__day--outside">29</button>
      <button className="c-datepicker__day c-datepicker__day--outside">30</button>
      <button className="c-datepicker__day">1</button>
      <button className="c-datepicker__day">2</button>
      <button className="c-datepicker__day">3</button>
      <button className="c-datepicker__day">4</button>
      <button className="c-datepicker__day">5</button>
      <button className="c-datepicker__day">6</button>
      <button className="c-datepicker__day">7</button>
      <button className="c-datepicker__day">8</button>
      <button className="c-datepicker__day">9</button>
      <button className="c-datepicker__day">10</button>
      <button className="c-datepicker__day">11</button>
      <button className="c-datepicker__day">12</button>
      <button className="c-datepicker__day">13</button>
      <button className="c-datepicker__day">14</button>
      <button className="c-datepicker__day c-datepicker__day--selected">15</button>
      <button className="c-datepicker__day">16</button>
      <button className="c-datepicker__day">17</button>
      <button className="c-datepicker__day">18</button>
      <button className="c-datepicker__day">19</button>
      <button className="c-datepicker__day">20</button>
      <button className="c-datepicker__day">21</button>
      <button className="c-datepicker__day">22</button>
      <button className="c-datepicker__day">23</button>
      <button className="c-datepicker__day">24</button>
      <button className="c-datepicker__day">25</button>
      <button className="c-datepicker__day">26</button>
      <button className="c-datepicker__day">27</button>
      <button className="c-datepicker__day">28</button>
      <button className="c-datepicker__day">29</button>
      <button className="c-datepicker__day">30</button>
      <button className="c-datepicker__day">31</button>
      <button className="c-datepicker__day c-datepicker__day--outside">1</button>
      <button className="c-datepicker__day c-datepicker__day--outside">2</button>
      <button className="c-datepicker__day c-datepicker__day--outside">3</button>
      <button className="c-datepicker__day c-datepicker__day--outside">4</button>
    </div>
  </div>
</div>`}
        >
          <div className="c-datepicker">
            <div className="c-datepicker__input-wrapper">
              <input 
                type="text" 
                className="c-datepicker__input" 
                placeholder="Select date" 
                value="2023-10-15" 
                readOnly 
              />
              <button className="c-datepicker__toggle">
                <i className="fas fa-calendar"></i>
              </button>
            </div>
            <div className="c-datepicker__calendar">
              <div className="c-datepicker__header">
                <button className="c-datepicker__nav c-datepicker__nav--prev">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="c-datepicker__title">October 2023</div>
                <button className="c-datepicker__nav c-datepicker__nav--next">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="c-datepicker__weekdays">
                <div className="c-datepicker__weekday">Su</div>
                <div className="c-datepicker__weekday">Mo</div>
                <div className="c-datepicker__weekday">Tu</div>
                <div className="c-datepicker__weekday">We</div>
                <div className="c-datepicker__weekday">Th</div>
                <div className="c-datepicker__weekday">Fr</div>
                <div className="c-datepicker__weekday">Sa</div>
              </div>
              <div className="c-datepicker__days">
                <button className="c-datepicker__day c-datepicker__day--outside">24</button>
                <button className="c-datepicker__day c-datepicker__day--outside">25</button>
                <button className="c-datepicker__day c-datepicker__day--outside">26</button>
                <button className="c-datepicker__day c-datepicker__day--outside">27</button>
                <button className="c-datepicker__day c-datepicker__day--outside">28</button>
                <button className="c-datepicker__day c-datepicker__day--outside">29</button>
                <button className="c-datepicker__day c-datepicker__day--outside">30</button>
                <button className="c-datepicker__day">1</button>
                <button className="c-datepicker__day">2</button>
                <button className="c-datepicker__day">3</button>
                <button className="c-datepicker__day">4</button>
                <button className="c-datepicker__day">5</button>
                <button className="c-datepicker__day">6</button>
                <button className="c-datepicker__day">7</button>
                <button className="c-datepicker__day">8</button>
                <button className="c-datepicker__day">9</button>
                <button className="c-datepicker__day">10</button>
                <button className="c-datepicker__day">11</button>
                <button className="c-datepicker__day">12</button>
                <button className="c-datepicker__day">13</button>
                <button className="c-datepicker__day">14</button>
                <button className="c-datepicker__day c-datepicker__day--selected">15</button>
                <button className="c-datepicker__day">16</button>
                <button className="c-datepicker__day">17</button>
                <button className="c-datepicker__day">18</button>
                <button className="c-datepicker__day">19</button>
                <button className="c-datepicker__day">20</button>
                <button className="c-datepicker__day">21</button>
                <button className="c-datepicker__day">22</button>
                <button className="c-datepicker__day">23</button>
                <button className="c-datepicker__day">24</button>
                <button className="c-datepicker__day">25</button>
                <button className="c-datepicker__day">26</button>
                <button className="c-datepicker__day">27</button>
                <button className="c-datepicker__day">28</button>
                <button className="c-datepicker__day">29</button>
                <button className="c-datepicker__day">30</button>
                <button className="c-datepicker__day">31</button>
                <button className="c-datepicker__day c-datepicker__day--outside">1</button>
                <button className="c-datepicker__day c-datepicker__day--outside">2</button>
                <button className="c-datepicker__day c-datepicker__day--outside">3</button>
                <button className="c-datepicker__day c-datepicker__day--outside">4</button>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="Date Range Picker"
          description="Select a range of dates with start and end dates"
          code={`<div className="c-datepicker c-datepicker--range">
  <div className="c-datepicker__input-wrapper">
    <input 
      type="text" 
      className="c-datepicker__input" 
      placeholder="Start date" 
      value="2023-10-10" 
      readOnly 
    />
    <span className="c-datepicker__range-separator">to</span>
    <input 
      type="text" 
      className="c-datepicker__input" 
      placeholder="End date" 
      value="2023-10-15" 
      readOnly 
    />
    <button className="c-datepicker__toggle">
      <i className="fas fa-calendar"></i>
    </button>
  </div>
  <div className="c-datepicker__calendar">
    <div className="c-datepicker__header">
      <button className="c-datepicker__nav c-datepicker__nav--prev">
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="c-datepicker__title">October 2023</div>
      <button className="c-datepicker__nav c-datepicker__nav--next">
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
    <div className="c-datepicker__weekdays">
      <div className="c-datepicker__weekday">Su</div>
      <div className="c-datepicker__weekday">Mo</div>
      <div className="c-datepicker__weekday">Tu</div>
      <div className="c-datepicker__weekday">We</div>
      <div className="c-datepicker__weekday">Th</div>
      <div className="c-datepicker__weekday">Fr</div>
      <div className="c-datepicker__weekday">Sa</div>
    </div>
    <div className="c-datepicker__days">
      <button className="c-datepicker__day c-datepicker__day--outside">24</button>
      <button className="c-datepicker__day c-datepicker__day--outside">25</button>
      <button className="c-datepicker__day c-datepicker__day--outside">26</button>
      <button className="c-datepicker__day c-datepicker__day--outside">27</button>
      <button className="c-datepicker__day c-datepicker__day--outside">28</button>
      <button className="c-datepicker__day c-datepicker__day--outside">29</button>
      <button className="c-datepicker__day c-datepicker__day--outside">30</button>
      <button className="c-datepicker__day">1</button>
      <button className="c-datepicker__day">2</button>
      <button className="c-datepicker__day">3</button>
      <button className="c-datepicker__day">4</button>
      <button className="c-datepicker__day">5</button>
      <button className="c-datepicker__day">6</button>
      <button className="c-datepicker__day">7</button>
      <button className="c-datepicker__day">8</button>
      <button className="c-datepicker__day">9</button>
      <button className="c-datepicker__day c-datepicker__day--range-start">10</button>
      <button className="c-datepicker__day c-datepicker__day--in-range">11</button>
      <button className="c-datepicker__day c-datepicker__day--in-range">12</button>
      <button className="c-datepicker__day c-datepicker__day--in-range">13</button>
      <button className="c-datepicker__day c-datepicker__day--in-range">14</button>
      <button className="c-datepicker__day c-datepicker__day--range-end">15</button>
      <button className="c-datepicker__day">16</button>
      <button className="c-datepicker__day">17</button>
      <button className="c-datepicker__day">18</button>
      <button className="c-datepicker__day">19</button>
      <button className="c-datepicker__day">20</button>
      <button className="c-datepicker__day">21</button>
      <button className="c-datepicker__day">22</button>
      <button className="c-datepicker__day">23</button>
      <button className="c-datepicker__day">24</button>
      <button className="c-datepicker__day">25</button>
      <button className="c-datepicker__day">26</button>
      <button className="c-datepicker__day">27</button>
      <button className="c-datepicker__day">28</button>
      <button className="c-datepicker__day">29</button>
      <button className="c-datepicker__day">30</button>
      <button className="c-datepicker__day">31</button>
      <button className="c-datepicker__day c-datepicker__day--outside">1</button>
      <button className="c-datepicker__day c-datepicker__day--outside">2</button>
      <button className="c-datepicker__day c-datepicker__day--outside">3</button>
      <button className="c-datepicker__day c-datepicker__day--outside">4</button>
    </div>
  </div>
</div>`}
        >
          <div className="c-datepicker c-datepicker--range">
            <div className="c-datepicker__input-wrapper">
              <input 
                type="text" 
                className="c-datepicker__input" 
                placeholder="Start date" 
                value="2023-10-10" 
                readOnly 
              />
              <span className="c-datepicker__range-separator">to</span>
              <input 
                type="text" 
                className="c-datepicker__input" 
                placeholder="End date" 
                value="2023-10-15" 
                readOnly 
              />
              <button className="c-datepicker__toggle">
                <i className="fas fa-calendar"></i>
              </button>
            </div>
            <div className="c-datepicker__calendar">
              <div className="c-datepicker__header">
                <button className="c-datepicker__nav c-datepicker__nav--prev">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="c-datepicker__title">October 2023</div>
                <button className="c-datepicker__nav c-datepicker__nav--next">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="c-datepicker__weekdays">
                <div className="c-datepicker__weekday">Su</div>
                <div className="c-datepicker__weekday">Mo</div>
                <div className="c-datepicker__weekday">Tu</div>
                <div className="c-datepicker__weekday">We</div>
                <div className="c-datepicker__weekday">Th</div>
                <div className="c-datepicker__weekday">Fr</div>
                <div className="c-datepicker__weekday">Sa</div>
              </div>
              <div className="c-datepicker__days">
                <button className="c-datepicker__day c-datepicker__day--outside">24</button>
                <button className="c-datepicker__day c-datepicker__day--outside">25</button>
                <button className="c-datepicker__day c-datepicker__day--outside">26</button>
                <button className="c-datepicker__day c-datepicker__day--outside">27</button>
                <button className="c-datepicker__day c-datepicker__day--outside">28</button>
                <button className="c-datepicker__day c-datepicker__day--outside">29</button>
                <button className="c-datepicker__day c-datepicker__day--outside">30</button>
                <button className="c-datepicker__day">1</button>
                <button className="c-datepicker__day">2</button>
                <button className="c-datepicker__day">3</button>
                <button className="c-datepicker__day">4</button>
                <button className="c-datepicker__day">5</button>
                <button className="c-datepicker__day">6</button>
                <button className="c-datepicker__day">7</button>
                <button className="c-datepicker__day">8</button>
                <button className="c-datepicker__day">9</button>
                <button className="c-datepicker__day c-datepicker__day--range-start">10</button>
                <button className="c-datepicker__day c-datepicker__day--in-range">11</button>
                <button className="c-datepicker__day c-datepicker__day--in-range">12</button>
                <button className="c-datepicker__day c-datepicker__day--in-range">13</button>
                <button className="c-datepicker__day c-datepicker__day--in-range">14</button>
                <button className="c-datepicker__day c-datepicker__day--range-end">15</button>
                <button className="c-datepicker__day">16</button>
                <button className="c-datepicker__day">17</button>
                <button className="c-datepicker__day">18</button>
                <button className="c-datepicker__day">19</button>
                <button className="c-datepicker__day">20</button>
                <button className="c-datepicker__day">21</button>
                <button className="c-datepicker__day">22</button>
                <button className="c-datepicker__day">23</button>
                <button className="c-datepicker__day">24</button>
                <button className="c-datepicker__day">25</button>
                <button className="c-datepicker__day">26</button>
                <button className="c-datepicker__day">27</button>
                <button className="c-datepicker__day">28</button>
                <button className="c-datepicker__day">29</button>
                <button className="c-datepicker__day">30</button>
                <button className="c-datepicker__day">31</button>
                <button className="c-datepicker__day c-datepicker__day--outside">1</button>
                <button className="c-datepicker__day c-datepicker__day--outside">2</button>
                <button className="c-datepicker__day c-datepicker__day--outside">3</button>
                <button className="c-datepicker__day c-datepicker__day--outside">4</button>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="With Time Picker"
          description="Date picker with time selection capability"
          code={`<div className="c-datepicker c-datepicker--datetime">
  <div className="c-datepicker__input-wrapper">
    <input 
      type="text" 
      className="c-datepicker__input" 
      placeholder="Select date and time" 
      value="2023-10-15 14:30" 
      readOnly 
    />
    <button className="c-datepicker__toggle">
      <i className="fas fa-calendar"></i>
    </button>
  </div>
  <div className="c-datepicker__calendar">
    <div className="c-datepicker__header">
      <button className="c-datepicker__nav c-datepicker__nav--prev">
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="c-datepicker__title">October 2023</div>
      <button className="c-datepicker__nav c-datepicker__nav--next">
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
    <div className="c-datepicker__weekdays">
      <div className="c-datepicker__weekday">Su</div>
      <div className="c-datepicker__weekday">Mo</div>
      <div className="c-datepicker__weekday">Tu</div>
      <div className="c-datepicker__weekday">We</div>
      <div className="c-datepicker__weekday">Th</div>
      <div className="c-datepicker__weekday">Fr</div>
      <div className="c-datepicker__weekday">Sa</div>
    </div>
    <div className="c-datepicker__days">
      <button className="c-datepicker__day c-datepicker__day--outside">24</button>
      <button className="c-datepicker__day c-datepicker__day--outside">25</button>
      <button className="c-datepicker__day c-datepicker__day--outside">26</button>
      <button className="c-datepicker__day c-datepicker__day--outside">27</button>
      <button className="c-datepicker__day c-datepicker__day--outside">28</button>
      <button className="c-datepicker__day c-datepicker__day--outside">29</button>
      <button className="c-datepicker__day c-datepicker__day--outside">30</button>
      <button className="c-datepicker__day">1</button>
      <button className="c-datepicker__day">2</button>
      <button className="c-datepicker__day">3</button>
      <button className="c-datepicker__day">4</button>
      <button className="c-datepicker__day">5</button>
      <button className="c-datepicker__day">6</button>
      <button className="c-datepicker__day">7</button>
      <button className="c-datepicker__day">8</button>
      <button className="c-datepicker__day">9</button>
      <button className="c-datepicker__day">10</button>
      <button className="c-datepicker__day">11</button>
      <button className="c-datepicker__day">12</button>
      <button className="c-datepicker__day">13</button>
      <button className="c-datepicker__day">14</button>
      <button className="c-datepicker__day c-datepicker__day--selected">15</button>
      <button className="c-datepicker__day">16</button>
      <button className="c-datepicker__day">17</button>
      <button className="c-datepicker__day">18</button>
      <button className="c-datepicker__day">19</button>
      <button className="c-datepicker__day">20</button>
      <button className="c-datepicker__day">21</button>
      <button className="c-datepicker__day">22</button>
      <button className="c-datepicker__day">23</button>
      <button className="c-datepicker__day">24</button>
      <button className="c-datepicker__day">25</button>
      <button className="c-datepicker__day">26</button>
      <button className="c-datepicker__day">27</button>
      <button className="c-datepicker__day">28</button>
      <button className="c-datepicker__day">29</button>
      <button className="c-datepicker__day">30</button>
      <button className="c-datepicker__day">31</button>
      <button className="c-datepicker__day c-datepicker__day--outside">1</button>
      <button className="c-datepicker__day c-datepicker__day--outside">2</button>
      <button className="c-datepicker__day c-datepicker__day--outside">3</button>
      <button className="c-datepicker__day c-datepicker__day--outside">4</button>
    </div>
    <div className="c-datepicker__time">
      <div className="c-datepicker__time-field">
        <label className="c-datepicker__time-label">Hours:</label>
        <select className="c-datepicker__time-select">
          <option>00</option>
          <option>01</option>
          <option>02</option>
          <option>...</option>
          <option selected>14</option>
          <option>15</option>
          <option>...</option>
          <option>23</option>
        </select>
      </div>
      <div className="c-datepicker__time-separator">:</div>
      <div className="c-datepicker__time-field">
        <label className="c-datepicker__time-label">Minutes:</label>
        <select className="c-datepicker__time-select">
          <option>00</option>
          <option>15</option>
          <option selected>30</option>
          <option>45</option>
        </select>
      </div>
    </div>
  </div>
</div>`}
        >
          <div className="c-datepicker c-datepicker--datetime">
            <div className="c-datepicker__input-wrapper">
              <input 
                type="text" 
                className="c-datepicker__input" 
                placeholder="Select date and time" 
                value="2023-10-15 14:30" 
                readOnly 
              />
              <button className="c-datepicker__toggle">
                <i className="fas fa-calendar"></i>
              </button>
            </div>
            <div className="c-datepicker__calendar">
              <div className="c-datepicker__header">
                <button className="c-datepicker__nav c-datepicker__nav--prev">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="c-datepicker__title">October 2023</div>
                <button className="c-datepicker__nav c-datepicker__nav--next">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="c-datepicker__weekdays">
                <div className="c-datepicker__weekday">Su</div>
                <div className="c-datepicker__weekday">Mo</div>
                <div className="c-datepicker__weekday">Tu</div>
                <div className="c-datepicker__weekday">We</div>
                <div className="c-datepicker__weekday">Th</div>
                <div className="c-datepicker__weekday">Fr</div>
                <div className="c-datepicker__weekday">Sa</div>
              </div>
              <div className="c-datepicker__days">
                <button className="c-datepicker__day c-datepicker__day--outside">24</button>
                <button className="c-datepicker__day c-datepicker__day--outside">25</button>
                <button className="c-datepicker__day c-datepicker__day--outside">26</button>
                <button className="c-datepicker__day c-datepicker__day--outside">27</button>
                <button className="c-datepicker__day c-datepicker__day--outside">28</button>
                <button className="c-datepicker__day c-datepicker__day--outside">29</button>
                <button className="c-datepicker__day c-datepicker__day--outside">30</button>
                <button className="c-datepicker__day">1</button>
                <button className="c-datepicker__day">2</button>
                <button className="c-datepicker__day">3</button>
                <button className="c-datepicker__day">4</button>
                <button className="c-datepicker__day">5</button>
                <button className="c-datepicker__day">6</button>
                <button className="c-datepicker__day">7</button>
                <button className="c-datepicker__day">8</button>
                <button className="c-datepicker__day">9</button>
                <button className="c-datepicker__day">10</button>
                <button className="c-datepicker__day">11</button>
                <button className="c-datepicker__day">12</button>
                <button className="c-datepicker__day">13</button>
                <button className="c-datepicker__day">14</button>
                <button className="c-datepicker__day c-datepicker__day--selected">15</button>
                <button className="c-datepicker__day">16</button>
                <button className="c-datepicker__day">17</button>
                <button className="c-datepicker__day">18</button>
                <button className="c-datepicker__day">19</button>
                <button className="c-datepicker__day">20</button>
                <button className="c-datepicker__day">21</button>
                <button className="c-datepicker__day">22</button>
                <button className="c-datepicker__day">23</button>
                <button className="c-datepicker__day">24</button>
                <button className="c-datepicker__day">25</button>
                <button className="c-datepicker__day">26</button>
                <button className="c-datepicker__day">27</button>
                <button className="c-datepicker__day">28</button>
                <button className="c-datepicker__day">29</button>
                <button className="c-datepicker__day">30</button>
                <button className="c-datepicker__day">31</button>
                <button className="c-datepicker__day c-datepicker__day--outside">1</button>
                <button className="c-datepicker__day c-datepicker__day--outside">2</button>
                <button className="c-datepicker__day c-datepicker__day--outside">3</button>
                <button className="c-datepicker__day c-datepicker__day--outside">4</button>
              </div>
              <div className="c-datepicker__time">
                <div className="c-datepicker__time-field">
                  <label className="c-datepicker__time-label">Hours:</label>
                  <select className="c-datepicker__time-select">
                    <option>00</option>
                    <option>01</option>
                    <option>02</option>
                    <option>...</option>
                    <option selected>14</option>
                    <option>15</option>
                    <option>...</option>
                    <option>23</option>
                  </select>
                </div>
                <div className="c-datepicker__time-separator">:</div>
                <div className="c-datepicker__time-field">
                  <label className="c-datepicker__time-label">Minutes:</label>
                  <select className="c-datepicker__time-select">
                    <option>00</option>
                    <option>15</option>
                    <option selected>30</option>
                    <option>45</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <ComponentDemo
          title="With Min/Max Dates"
          description="Date picker with minimum and maximum selectable dates"
          code={`<div className="c-datepicker">
  <div className="c-datepicker__input-wrapper">
    <input 
      type="text" 
      className="c-datepicker__input" 
      placeholder="Select date" 
      value="2023-10-15" 
      readOnly 
    />
    <button className="c-datepicker__toggle">
      <i className="fas fa-calendar"></i>
    </button>
  </div>
  <div className="c-datepicker__calendar">
    <div className="c-datepicker__header">
      <button className="c-datepicker__nav c-datepicker__nav--prev">
        <i className="fas fa-chevron-left"></i>
      </button>
      <div className="c-datepicker__title">October 2023</div>
      <button className="c-datepicker__nav c-datepicker__nav--next">
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
    <div className="c-datepicker__weekdays">
      <div className="c-datepicker__weekday">Su</div>
      <div className="c-datepicker__weekday">Mo</div>
      <div className="c-datepicker__weekday">Tu</div>
      <div className="c-datepicker__weekday">We</div>
      <div className="c-datepicker__weekday">Th</div>
      <div className="c-datepicker__weekday">Fr</div>
      <div className="c-datepicker__weekday">Sa</div>
    </div>
    <div className="c-datepicker__days">
      <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">24</button>
      <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">25</button>
      <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">26</button>
      <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">27</button>
      <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">28</button>
      <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">29</button>
      <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">30</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">1</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">2</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">3</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">4</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">5</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">6</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">7</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">8</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">9</button>
      <button className="c-datepicker__day">10</button>
      <button className="c-datepicker__day">11</button>
      <button className="c-datepicker__day">12</button>
      <button className="c-datepicker__day">13</button>
      <button className="c-datepicker__day">14</button>
      <button className="c-datepicker__day c-datepicker__day--selected">15</button>
      <button className="c-datepicker__day">16</button>
      <button className="c-datepicker__day">17</button>
      <button className="c-datepicker__day">18</button>
      <button className="c-datepicker__day">19</button>
      <button className="c-datepicker__day">20</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">21</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">22</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">23</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">24</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">25</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">26</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">27</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">28</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">29</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">30</button>
      <button className="c-datepicker__day c-datepicker__day--disabled">31</button>
      <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">1</button>
      <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">2</button>
      <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">3</button>
      <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">4</button>
    </div>
    <div className="c-datepicker__footer">
      <div className="c-datepicker__info">Select a date between Oct 10 - Oct 20</div>
    </div>
  </div>
</div>`}
        >
          <div className="c-datepicker">
            <div className="c-datepicker__input-wrapper">
              <input 
                type="text" 
                className="c-datepicker__input" 
                placeholder="Select date" 
                value="2023-10-15" 
                readOnly 
              />
              <button className="c-datepicker__toggle">
                <i className="fas fa-calendar"></i>
              </button>
            </div>
            <div className="c-datepicker__calendar">
              <div className="c-datepicker__header">
                <button className="c-datepicker__nav c-datepicker__nav--prev">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="c-datepicker__title">October 2023</div>
                <button className="c-datepicker__nav c-datepicker__nav--next">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="c-datepicker__weekdays">
                <div className="c-datepicker__weekday">Su</div>
                <div className="c-datepicker__weekday">Mo</div>
                <div className="c-datepicker__weekday">Tu</div>
                <div className="c-datepicker__weekday">We</div>
                <div className="c-datepicker__weekday">Th</div>
                <div className="c-datepicker__weekday">Fr</div>
                <div className="c-datepicker__weekday">Sa</div>
              </div>
              <div className="c-datepicker__days">
                <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">24</button>
                <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">25</button>
                <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">26</button>
                <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">27</button>
                <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">28</button>
                <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">29</button>
                <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">30</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">1</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">2</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">3</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">4</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">5</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">6</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">7</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">8</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">9</button>
                <button className="c-datepicker__day">10</button>
                <button className="c-datepicker__day">11</button>
                <button className="c-datepicker__day">12</button>
                <button className="c-datepicker__day">13</button>
                <button className="c-datepicker__day">14</button>
                <button className="c-datepicker__day c-datepicker__day--selected">15</button>
                <button className="c-datepicker__day">16</button>
                <button className="c-datepicker__day">17</button>
                <button className="c-datepicker__day">18</button>
                <button className="c-datepicker__day">19</button>
                <button className="c-datepicker__day">20</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">21</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">22</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">23</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">24</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">25</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">26</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">27</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">28</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">29</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">30</button>
                <button className="c-datepicker__day c-datepicker__day--disabled">31</button>
                <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">1</button>
                <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">2</button>
                <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">3</button>
                <button className="c-datepicker__day c-datepicker__day--outside c-datepicker__day--disabled">4</button>
              </div>
              <div className="c-datepicker__footer">
                <div className="c-datepicker__info">Select a date between Oct 10 - Oct 20</div>
              </div>
            </div>
          </div>
        </ComponentDemo>

        <h2 className="u-mt-8">Props</h2>
        <div className="u-overflow-x-auto">
          <table className="c-data-table">
            <thead className="c-data-table__header">
              <tr className="c-data-table__row">
                <th className="c-data-table__header-cell">Name</th>
                <th className="c-data-table__header-cell">Type</th>
                <th className="c-data-table__header-cell">Description</th>
                <th className="c-data-table__header-cell">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>value</code></td>
                <td className="c-data-table__cell"><code>Date | null</code></td>
                <td className="c-data-table__cell">Selected date</td>
                <td className="c-data-table__cell"><code>null</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onChange</code></td>
                <td className="c-data-table__cell"><code>(date: Date) => void</code></td>
                <td className="c-data-table__cell">Callback when date changes</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>format</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Date format string</td>
                <td className="c-data-table__cell"><code>'YYYY-MM-DD'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>placeholder</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Input placeholder text</td>
                <td className="c-data-table__cell"><code>'Select date'</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>minDate</code></td>
                <td className="c-data-table__cell"><code>Date | null</code></td>
                <td className="c-data-table__cell">Minimum selectable date</td>
                <td className="c-data-table__cell"><code>null</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>maxDate</code></td>
                <td className="c-data-table__cell"><code>Date | null</code></td>
                <td className="c-data-table__cell">Maximum selectable date</td>
                <td className="c-data-table__cell"><code>null</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>disabled</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether the datepicker is disabled</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>showTime</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to show time picker</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>range</code></td>
                <td className="c-data-table__cell"><code>boolean</code></td>
                <td className="c-data-table__cell">Whether to enable date range selection</td>
                <td className="c-data-table__cell"><code>false</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>rangeValue</code></td>
                <td className="c-data-table__cell"><code>[Date | null, Date | null]</code></td>
                <td className="c-data-table__cell">Selected date range</td>
                <td className="c-data-table__cell"><code>[null, null]</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>onRangeChange</code></td>
                <td className="c-data-table__cell"><code>(dates: [Date | null, Date | null]) => void</code></td>
                <td className="c-data-table__cell">Callback when date range changes</td>
                <td className="c-data-table__cell"><code>undefined</code></td>
              </tr>
              <tr className="c-data-table__row">
                <td className="c-data-table__cell"><code>className</code></td>
                <td className="c-data-table__cell"><code>string</code></td>
                <td className="c-data-table__cell">Additional CSS classes</td>
                <td className="c-data-table__cell"><code>''</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="u-mt-8">Accessibility</h2>
        <p>
          The DatePicker component follows accessibility best practices:
        </p>
        <ul className="c-list">
          <li className="c-list__item">Uses proper ARIA attributes for the calendar interface</li>
          <li className="c-list__item">Supports keyboard navigation for date selection</li>
          <li className="c-list__item">Provides clear visual indicators for selected and current dates</li>
          <li className="c-list__item">Includes proper labeling for screen readers</li>
          <li className="c-list__item">Ensures disabled dates are properly communicated to assistive technologies</li>
        </ul>

        <h2 className="u-mt-8">Best Practices</h2>
        <ul className="c-list">
          <li className="c-list__item">Use clear date format that is familiar to your users</li>
          <li className="c-list__item">Provide a placeholder text that indicates the expected date format</li>
          <li className="c-list__item">Use min and max date constraints when appropriate for your use case</li>
          <li className="c-list__item">Consider using a date range picker for booking or reporting interfaces</li>
          <li className="c-list__item">Include time selection only when necessary for your application</li>
          <li className="c-list__item">Ensure the calendar popup is properly positioned and doesn't overflow the viewport</li>
          <li className="c-list__item">Provide clear visual feedback for the current date, selected date, and date range</li>
        </ul>
      </div>
    </DocsLayout>
  )
}
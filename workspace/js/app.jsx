/**
 * File        : app.jsx
 * Description : React components.
 * Copyright   : Copyright (c) 2013-2016 Facebook Inc. All rights reserved.
 * Maintainer  : Enzo Haussecker <enzo@mirror.co>
 * Stability   : Stable
 * Portability : Portable
 *
 * NOTICE: Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1) Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2) Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3) Neither the name Facebook nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific prior
 * written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * This script implements React components for the index page.
 */

'use strict';

var BootstrapButton = React.createClass({
	render: function() {
		return (
			<a {...this.props} href="javascript:;" role="button"
			className={(this.props.className || '') + ' btn'} />
		);
	}
});

var BootstrapModal = React.createClass({
	componentDidMount: function() {
		$(this.refs.root).modal({backdrop: 'static', keyboard: false, show: false});
		$(this.refs.root).on('hidden.bs.modal', this.handleHidden);
	},
	componentWillUnmount: function() {
		$(this.refs.root).off('hidden.bs.modal', this.handleHidden);
	},
	close: function() {
		$(this.refs.root).modal('hide');
	},
	open: function() {
		$(this.refs.root).modal('show');
	},
	render: function() {
		var confirmButton = null;
		var cancelButton = null;
		if (this.props.confirm) {
			confirmButton = (
				<BootstrapButton className="btn-primary" onClick={this.handleConfirm}>
					{this.props.confirm}
				</BootstrapButton>
			);
		}
		if (this.props.cancel) {
			cancelButton = (
				<BootstrapButton className="btn-default" onClick={this.handleCancel}>
					{this.props.cancel}
				</BootstrapButton>
			);
		}
		return (
			<div className="modal fade" ref="root">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" onClick={this.handleCancel}>
								&times;
							</button>
							<h3>{this.props.title}</h3>
						</div>
						<div className="modal-body">
							{this.props.children}
						</div>
						<div className="modal-footer">
							{cancelButton}
							{confirmButton}
						</div>
					</div>
				</div>
			</div>
		);
	},
	handleCancel: function() {
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	},
	handleConfirm: function() {
		if (this.props.onConfirm) {
			this.props.onConfirm();
		}
	},
	handleHidden: function() {
		if (this.props.onHidden) {
			this.props.onHidden();
		}
	}
});

var Example = React.createClass({
	handleCancel: function() {
		if (confirm('Are you sure you want to cancel?')) {
			this.refs.modal.close();
		}
	},
	render: function() {
		var modal = null;
		modal = (
			<BootstrapModal
				ref="modal"
				confirm="OK"
				cancel="Cancel"
				onCancel={this.handleCancel}
				onConfirm={this.closeModal}
				onHidden={this.handleModalDidClose}
				title="Hello, Bootstrap!">
					This is a React component powered by jQuery and Bootstrap!
			</BootstrapModal>
		);
		return (
			<div className="example">
				{modal}
				<BootstrapButton onClick={this.openModal} className="btn-default">
					Open modal
				</BootstrapButton>
			</div>
		);
	},
	openModal: function() {
		this.refs.modal.open();
	},
	closeModal: function() {
		this.refs.modal.close();
	},
	handleModalDidClose: function() {
		alert("The modal has been dismissed!");
	}
});

ReactDOM.render(<Example />, document.getElementById('example'));

"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber
    ) {
      setError("All fields are required");
      return false;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;

      setLoading(true);
      setError("");

      const response = await fetch("/api/accountuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
        }),
      });

      // Debug the response
      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Raw response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("JSON parse error:", e);
        throw new Error(
          `Invalid server response: ${responseText.slice(0, 100)}`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      });
      onOpenChange();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      console.error("Full error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onPress={onOpen} color="primary">
        Add User
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add User
              </ModalHeader>
              <ModalBody>
                {error && (
                  <div className="text-red-500 text-sm mb-2 p-2 bg-red-50 rounded">
                    {error}
                  </div>
                )}
                <Input
                  label="Email"
                  variant="bordered"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                />
                <Input
                  label="First Name"
                  variant="bordered"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Last Name"
                  variant="bordered"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Phone Number"
                  variant="bordered"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  type="tel"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isLoading={loading}
                >
                  Add User
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

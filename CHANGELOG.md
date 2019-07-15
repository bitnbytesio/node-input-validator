# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- nothing

### Changed

- nothing

### Deprecated

- nothing

### Removed

- nothing

### Fixed

- nothing

### Security

- nothing

## [3.5.0]

### Added

- arrayUnique: array must contains unique values
- arrayUniqueObjects: array of objects must have unique attribute as per seed
- length: length rule with max and min (optional) seed

### Fixed

- requiredwith, requiredWithout throw exception in case of invalid seed
- integer 0 makes required rule to failed, as 0 was considered as empty

## [3.4.2]

### Added

- Example of custom rule using other attributes

## [3.4.1]

### Fixed

- crash in case of using non-string rules in constructor will now fails with exception of in valid rule

## [3.4.0]

### Added

- gt: greater then another field rule
- gte: greater then or equals another field rule
- lt: less then another field rule
- lte: less then or equals another field rule

### Fixed

- typings
- multiple underscore (_) replacement with space issue

## [3.3.0]

### Fixed

- between rule
- lengthBetween rule

### Security

- npm audit vulnerabilities fix
